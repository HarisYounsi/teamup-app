const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

const router = express.Router();

// Récupérer tous les événements
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ statut: 'ouvert' })
      .populate('organisateur', 'nom prenom')
      .populate('participants', 'nom prenom')
      .sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Créer un événement (créateurs seulement)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'createur') {
      return res.status(403).json({ message: 'Seuls les créateurs peuvent créer des événements' });
    }

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

    const event = new Event({
      titre,
      description,
      sport,
      date,
      heure,
      lieu,
      ville,
      nombreParticipants,
      niveau: niveau || 'tous',
      organisateur: req.user._id
    });

    await event.save();
    
    const populatedEvent = await Event.findById(event._id)
      .populate('organisateur', 'nom prenom')
      .populate('participants', 'nom prenom');

    res.status(201).json({
      message: 'Événement créé avec succès',
      event: populatedEvent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer les événements d'un organisateur
router.get('/mes-events', auth, async (req, res) => {
  try {
    if (req.user.role !== 'createur') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const events = await Event.find({ organisateur: req.user._id })
      .populate('organisateur', 'nom prenom')
      .populate('participants', 'nom prenom')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// S'inscrire à un événement
router.post('/:id/join', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Vous êtes déjà inscrit à cet événement' });
    }

    if (event.participants.length >= event.nombreParticipants) {
      return res.status(400).json({ message: 'Événement complet' });
    }

    event.participants.push(req.user._id);
    
    if (event.participants.length >= event.nombreParticipants) {
      event.statut = 'complet';
    }

    await event.save();

    const updatedEvent = await Event.findById(event._id)
      .populate('organisateur', 'nom prenom')
      .populate('participants', 'nom prenom');

    res.json({
      message: 'Inscription réussie',
      event: updatedEvent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;