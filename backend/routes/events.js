const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Votre middleware d'authentification
const { getCoordinatesFromAddress } = require('../services/geocodingService');

// GET - Récupérer tous les événements
router.get('/', async (req, res) => {
  try {
    const { latitude, longitude, rayon } = req.query;
    
    let events;
    if (latitude && longitude && rayon) {
      // Recherche avec géolocalisation
      events = await Event.find({
        latitude: { $exists: true, $ne: null },
        longitude: { $exists: true, $ne: null }
      }).populate('organisateur', 'nom prenom');
      
      // Filtrer par distance (calcul approximatif)
      events = events.filter(event => {
        const distance = getDistance(
          parseFloat(latitude), 
          parseFloat(longitude),
          event.latitude, 
          event.longitude
        );
        return distance <= parseFloat(rayon);
      });
    } else {
      events = await Event.find().populate('organisateur', 'nom prenom');
    }
    
    res.json({ data: events });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST - Créer un nouvel événement avec géocodage automatique
router.post('/', auth, async (req, res) => {
  console.log('🚀 ROUTE POST /events APPELÉE !');
  console.log('Body reçu:', req.body);
  console.log('User authentifié:', req.user?.id);
  
  try {
    const { 
      titre, 
      description, 
      sport, 
      date, 
      heure, 
      lieu, 
      ville, 
      nombreParticipants, 
      niveau 
    } = req.body;

    console.log('📝 Données extraites:', { titre, lieu, ville });

    // Validation des champs requis
    if (!titre || !sport || !date || !heure || !lieu || !ville || !nombreParticipants) {
      console.log('❌ Validation échouée - champs manquants');
      return res.status(400).json({ 
        message: 'Tous les champs obligatoires doivent être remplis' 
      });
    }

    // Vérification de la clé API
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    console.log('🔑 Clé API disponible:', apiKey ? 'OUI' : 'NON');
    console.log('🔑 Début clé API:', apiKey ? apiKey.substring(0, 10) + '...' : 'UNDEFINED');

    // Géocodage automatique de l'adresse
    console.log(`🔍 Début du géocodage pour: ${lieu}, ${ville}`);
    const coordinates = await getCoordinatesFromAddress(lieu, ville);
    console.log('🎯 Résultat géocodage:', coordinates);

    // Créer l'événement avec ou sans coordonnées
    const newEvent = new Event({
      titre,
      description,
      sport,
      date,
      heure,
      lieu,
      ville,
      latitude: coordinates?.latitude || null,
      longitude: coordinates?.longitude || null,
      nombreParticipants,
      niveau: niveau || 'intermediaire',
      organisateur: req.user.id,
      participants: [],
      statut: 'ouvert'
    });

    console.log('💾 Sauvegarde de l\'événement...');
    const savedEvent = await newEvent.save();
    await savedEvent.populate('organisateur', 'nom prenom');

    // Log du résultat
    if (coordinates) {
      console.log(`✅ Événement créé avec coordonnées: ${coordinates.latitude}, ${coordinates.longitude}`);
    } else {
      console.log(`⚠️ Événement créé sans coordonnées pour: ${lieu}, ${ville}`);
    }

    console.log('🎉 Événement sauvé avec succès, ID:', savedEvent._id);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('💥 Erreur lors de la création de l\'événement:', error);
    console.error('💥 Stack trace:', error.stack);
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'événement' });
  }
});

// PUT - Mettre à jour un événement avec géocodage si l'adresse change
router.put('/:id', auth, async (req, res) => {
  try {
    const { lieu, ville, ...otherUpdates } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Vérifier si l'utilisateur est l'organisateur
    if (event.organisateur.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé à modifier cet événement' });
    }

    let updateData = { ...otherUpdates };

    // Si l'adresse a changé, régéocoder
    if (lieu || ville) {
      const newLieu = lieu || event.lieu;
      const newVille = ville || event.ville;
      
      if (newLieu !== event.lieu || newVille !== event.ville) {
        console.log(`🔄 Re-géocodage pour: ${newLieu}, ${newVille}`);
        const coordinates = await getCoordinatesFromAddress(newLieu, newVille);
        
        updateData.lieu = newLieu;
        updateData.ville = newVille;
        updateData.latitude = coordinates?.latitude || null;
        updateData.longitude = coordinates?.longitude || null;
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('organisateur', 'nom prenom');

    res.json(updatedEvent);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE - Supprimer un événement
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    if (event.organisateur.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé à supprimer cet événement' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Fonction utilitaire pour calculer la distance entre deux points GPS
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = router;