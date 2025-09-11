const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  sport: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  heure: {
    type: String,
    required: true
  },
  lieu: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
  },
  nombreParticipants: {
    type: Number,
    required: true
  },
  niveau: {
    type: String,
    enum: ['debutant', 'intermediaire', 'avance'],
    default: 'intermediaire'
  },
  organisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  statut: {
    type: String,
    enum: ['ouvert', 'complet', 'annule'],
    default: 'ouvert'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);