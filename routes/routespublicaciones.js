const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerPublicaciones.js');

router.get('/', Controller.getPublicaciones);
router.post('/', Controller.createPublicacion);
router.post('/comment', Controller.createComentarioPubli);
router.put('/:id', Controller.updatePublicacion);
router.delete('/:id', Controller.deletePubli);
router.get('/:id', Controller.getPublicacion);


module.exports = router;