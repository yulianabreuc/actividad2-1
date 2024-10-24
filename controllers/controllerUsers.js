const Model = require('../models/models.js');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    res.json(Model.getUsers());
};

exports.getUser = (req, res) => {
    const { id } = req.params;
    const user = Model.getUserById(id);
    res.json(user);
}

exports.createUser = (req, res) => {
    console.log("body", req.body);
    const { email, password, repassword, userName } = req.body;
    console.log(Model.getUserByUserName(userName))
    if (!email || !password || !repassword || !userName) {
        res.status(400).json({ message: 'Faltan datos requeridos: email, password, repetir password, userName' });
    } else if (password !== repassword) {
        res.status(400).json({ message: 'Las contraseñas no coinciden' });
    } else if (Model.getUserByUserName(userName)) {
        res.status(400).json({ message: 'El nombre de usuario ya está registrado' });        
    } else {
        const user = Model.getUserByEmail(email);
        if (user) {
            res.status(400).json({ message: 'El email ya está registrado' });
        } else {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            req.body.password = hashedPassword;
            Model.addUser(req.body);
            res.status(201).json({ message: 'User Guardado', data: req.body });
        }
    }
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Debe ingresar el email' });
    } else {
        const user = Model.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            Model.updateUser(id, req.body);
            res.status(200).json({ message: 'Usuario Actualizado', data: req.body });
        }
    }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const user = Model.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
        const publicaciones = Model.getUserPublicacionesById(id);
        if (publicaciones && publicaciones.length > 0) {
            return res.status(400).json({ message: 'El usuario tiene publicaciones y no puede ser eliminado' });
        }
        Model.deleteUser(id);
        res.status(200).json({ message: 'Usuario Eliminado' });
    }
};


exports.getUserPubli = (req, res) => {
    const { id } = req.params;
    const userPublicaciones = Model.getUserPublicacionesById(id);
    if (!userPublicaciones) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
        res.json(userPublicaciones);
    }
}