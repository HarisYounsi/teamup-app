const mongoose = require('mongoose');
const Event = require('../models/Event');
const { getCoordinatesFromAddress } = require('../services/geocodingService');
require('dotenv').config();

const updateExistingEvents = async () => {
  try {
    console.log('🚀 Début de la mise à jour des événements existants...');
    
    // Connecter à la base de données
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
    
    // Récupérer tous les événements sans coordonnées
    const eventsToUpdate = await Event.find({
      $or: [
        { latitude: { $exists: false } },
        { longitude: { $exists: false } },
        { latitude: null },
        { longitude: null }
      ]
    });
    
    console.log(`🔍 ${eventsToUpdate.length} événements à mettre à jour`);
    
    if (eventsToUpdate.length === 0) {
      console.log('✅ Tous les événements ont déjà des coordonnées');
      process.exit(0);
    }
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const event of eventsToUpdate) {
      console.log(`\n📍 Traitement: "${event.titre}" - ${event.lieu}, ${event.ville}`);
      
      try {
        const coordinates = await getCoordinatesFromAddress(event.lieu, event.ville);
        
        if (coordinates) {
          await Event.findByIdAndUpdate(event._id, {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          });
          
          console.log(`✅ Mis à jour: ${coordinates.latitude}, ${coordinates.longitude}`);
          successCount++;
        } else {
          console.log(`❌ Échec géocodage pour: ${event.lieu}, ${event.ville}`);
          failureCount++;
        }
      } catch (error) {
        console.error(`❌ Erreur pour "${event.titre}":`, error.message);
        failureCount++;
      }
      
      // Pause pour éviter de dépasser les limites de l'API Google
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n🎉 Mise à jour terminée!');
    console.log(`✅ Succès: ${successCount}`);
    console.log(`❌ Échecs: ${failureCount}`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('💥 Erreur lors de la mise à jour:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Fonction pour tester une adresse spécifique
const testSingleAddress = async (lieu, ville) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🧪 Test de géocodage pour: ${lieu}, ${ville}`);
    
    const coordinates = await getCoordinatesFromAddress(lieu, ville);
    
    if (coordinates) {
      console.log(`✅ Coordonnées trouvées:`, coordinates);
    } else {
      console.log(`❌ Impossible de géocoder cette adresse`);
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Erreur:', error);
    await mongoose.disconnect();
  }
};

// Exécuter le script selon les arguments
if (process.argv.length > 3) {
  // Test d'une adresse spécifique: node updateExistingEvents.js "Stade Pre Carré" "Ezanville"
  const lieu = process.argv[2];
  const ville = process.argv[3];
  testSingleAddress(lieu, ville);
} else {
  // Mise à jour de tous les événements
  updateExistingEvents();
}

module.exports = { updateExistingEvents, testSingleAddress };