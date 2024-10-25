const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    urlMedia: { type: String, required: true, unique: true },
    idUser: { type: String, required: true, unique: true }
});


module.exports = mongoose.model('Publicaciones', PublicacionesSchema);