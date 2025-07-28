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
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);