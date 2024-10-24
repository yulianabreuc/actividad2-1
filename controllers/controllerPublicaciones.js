const Model = require('../models/models.js');

exports.getPublicaciones = (req, res) => {
    res.json(Model.getPubli());
};

exports.getPublicacion = (req, res) => {
    const { id } = req.params;
    const publi = Model.getPubliById(id);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrado' });
    } else {
        res.json(Model.getPubliById(id));
    }
};

exports.createPublicacion = (req, res) => {
    console.log('req', req.body)
    const { title, description, urlMedia } = req.body;
    if (!title || !description || !urlMedia) {
        res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
    } else {
        Model.addPublicacion(req.body);
        res.status(201).json({ message: 'Publicacion Guardada', data: req.body });
    }
};

exports.createComentarioPubli = (req, res) => {
    const { idPubli } = req.body;
    const publi = Model.getPubliById(idPubli);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrado' });
    } else {
        const { comment, user } = req.body;
        if (!comment || !user) {
            res.status(400).json({ message: 'Faltan datos requeridos: comment, user' });
        } else {
            Model.addComentarioPubli(req.body);
            res.status(201).json({ message: 'Comentario Guardado', data: req.body });
        }
    }
}

exports.updatePublicacion = (req, res) => {
    const { id } = req.params;
    const publi = Model.getPubliById(id);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrada' });
    } else {
        const { title, description, urlMedia } = req.body;
        if (!title || !description || !urlMedia) {
            res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
        } else {
            Model.updatePublicacion(id, req.body);
            res.status(200).json({ message: 'Publicacion Actualizada', data: req.body });
        }
    }
}
exports.deletePubli = (req, res) => {
    const { id } = req.params;
    const publi = Model.getPubliById(id);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrado' });
    } else {
        Model.deletePubli(id);
        res.status(200).json({ message: 'Publicacion Eliminada' });
    }
};