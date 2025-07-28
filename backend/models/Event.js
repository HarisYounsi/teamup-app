const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
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
  nombreParticipants: {
    type: Number,
    required: true,
    min: 2
  },
  niveau: {
    type: String,
    enum: ['debutant', 'intermediaire', 'avance', 'tous'],
    default: 'tous'
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
});

module.exports = mongoose.model('Event', EventSchema);