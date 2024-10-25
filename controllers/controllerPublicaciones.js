const Publicaciones = require('../models/modelPublicaciones');
const User = require('../models/User');

class UserController {
    async createPublicacion(req, res) {
        const { title, description, urlMedia, idUser } = req.body;
        if (!title || !description || !urlMedia) {
            res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
        } else {
            const user = await User.findOne({id: idUser});
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                try {
                    const publicacion = new Publicaciones({
                        title: title,
                        description: description,
                        urlMedia: urlMedia,
                        idUser: idUser,
                    });
                    const newPubli = await publicacion.save(publicacion);
                    res.status(201).json({ message: 'Publicacion Guardada', data: newPubli });
                } catch (error) {
                    res.status(400).json({ message: 'Error al crear la publicacion', error: error.message });
                }
            }
        }
    }
    async getPublicaciones(req, res) {
        try {
            const publi = await Publicaciones.find();
            res.json(publi);
        } catch (err) {
            res.status(400).json({ message: 'Error al Consultar publicaciones', error: error.message });
        }
    }
}
module.exports = new UserController();

/*


exports.getPublicacion = (req, res) => {
    const { id } = req.params;
    const publi = Model.getPubliById(id);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrado' });
    } else {
        res.json(Model.getPubliById(id));
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
};*/