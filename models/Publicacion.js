const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);