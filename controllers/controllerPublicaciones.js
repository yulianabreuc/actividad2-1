const Publicacion = require('../models/modelPublicaciones');
const User = require('../models/User');
const Comment = require('../models/Comment');

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
                    const publicacion = new Publicacion({
                        title: title,
                        description: description,
                        urlMedia: urlMedia,
                        idUser: idUser,
                    });
                    const newPubli = await publicacion.save();
                    res.status(201).json({ message: 'Publicacion Guardada', data: newPubli });
                } catch (error) {
                    res.status(400).json({ message: 'Error al crear la publicacion', error: error.message });
                }
            }
        }
    }
    async getPublicaciones(req, res) {
        try {
            const publi = await Publicacion.find();
            res.json(publi);
        } catch (err) {
            res.status(400).json({ message: 'Error al Consultar publicaciones', error: error.message });
        }
    }
    async createComentarioPubli(req, res) {
        const { idPublicacion, comment, user } = req.body;
        if (!comment || !user) {
            return res.status(400).json({ message: 'Faltan datos requeridos: comment, user' });
        }
        try {
            const getuser = await User.findOne({id: user});
            const userSend = getuser._id;
            const publi = await Publicacion.findById(idPublicacion);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            const newComment = new Comment({
                comment,
                user: userSend,
                publicacion: idPublicacion
            });
            await newComment.save();
            res.status(201).json({ message: 'Comentario Guardado', data: newComment });
        } catch (error) {
            res.status(400).json({ message: 'Error al crear el comentario', error: error.message });
        }
    }
    async updatePublicacion(req, res) {
        const { id } = req.params;
        const { title, description, urlMedia } = req.body;
        if (!title || !description || !urlMedia) {
            return res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
        }
        try {
            const publi = await Publicacion.findById(id);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            publi.title = title;
            publi.description = description;
            publi.urlMedia = urlMedia;
            await publi.save();
            res.status(200).json({ message: 'Publicacion Actualizada', data: publi });
        } catch (error) {
            res.status(400).json({ message: 'Error al actualizar la publicacion', error: error.message });
        }
    }
    async deletePubli(req, res) {
        const { id } = req.params;
        try {
            const publi = await Publicacion.findById(id);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            await Publicacion.findByIdAndDelete(id);
            res.status(200).json({ message: 'Publicacion Eliminada Correctamente' });
        } catch (error) {
            res.status(400).json({ message: 'Error al eliminar la publicacion', error: error.message });
        }        
    };

    async getPublicacionById(req, res) {
        const { id } = req.params;
        try {
            const publi = await Publicacion.findById(id);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            res.json(publi);
        } catch (error) {
            res.status(400).json({ message: 'Error al consultar la publicacion', error: error.message });
        }
    }
}
module.exports = new UserController();