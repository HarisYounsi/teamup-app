const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['utilisateur', 'createur'],
    default: 'utilisateur'
  },
  sports: [{
    type: String,
    trim: true
  }],
  niveau: {
    type: String,
    enum: ['debutant', 'intermediaire', 'avance'],
    default: 'debutant'
  },
  ville: {
    type: String,
    trim: true
  },
  // Ajout de la localisation pour l'utilisateur
  adresse: {
    type: String,
    trim: true
  },
  coordonnees: {
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    }
  },
  // Préférences de distance de recherche
  rayonRecherche: {
    type: Number,
    default: 10, // en kilomètres
    min: 1,
    max: 100
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

// Index géospatial pour les recherches d'utilisateurs par proximité
UserSchema.index({ coordonnees: "2dsphere" });

module.exports = mongoose.model('User', UserSchema);