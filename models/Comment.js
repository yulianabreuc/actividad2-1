const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  publicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);