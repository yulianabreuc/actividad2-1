const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerUsers.js');

router.get('/', Controller.getUsers);
router.get('/:id', Controller.getUser);
router.post('/', Controller.createUser);
router.put('/:id', Controller.updateUser);
router.delete('/:id', Controller.deleteUser);
router.get('/userpubli/:id', Controller.getUserPubli);

module.exports = router;
