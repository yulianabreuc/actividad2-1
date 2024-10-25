const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
  urlMedia: { type: String, required: true, unique: false },
  idUser: { type: Schema.Types.ObjectId, ref: 'User', unique: false },
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);