const Model = require('../models/models.js');


exports.getSolicitudesAmistad = (req, res) => {
    res.json(Model.getSolicitudesAmistad());
}

exports.createSolicitudAmistad = (req, res) => {
    const { userSend, userReq } = req.body;   
    if (!userSend || !userReq) {
        return res.status(400).json({ error: 'Se requieren tanto userSend como userReq' });
    } else if (userSend === userReq) {
        return res.status(400).json({ error: 'userSend y userReq no pueden ser el mismo usuario' });
    } else {
        const relacion = Model.findRelacion(userSend, userReq);
        if (relacion) {
            if (relacion.estado === 'pendiente' || relacion.estado === 'aceptado') {
                return res.status(400).json({ error: 'Ya existe una solicitud de amistad pendiente entre estos usuarios' });
            } else if (relacion.estado === 'agregado') {
                return res.status(400).json({ error: 'Estos usuarios ya son amigos' });
            } else if (relacion.estado === 'rechazado') {
                req.body.estado = 'pendiente';
                const SolActu = Model.updateSolicitudAmi(relacion.id, req.body);
                res.status(201).json({ message: 'solicitud Modificada', SolActu });
            }else{
                res.status(201).json({ message: 'No entra en niguna condi' });
            }
        } else {
            req.body.estado = 'pendiente';
            const solCreada = Model.createSolicitudAmi(req.body);
            res.status(201).json({ message: 'solicitud Guardada', solCreada });
        }
    }
}

exports.updateSolicitudAmistad = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    if (!estado) {
        return res.status(400).json({ error: 'Se requiere el estado de la solicitud' });
    } else {
        const sol = Model.getSolicitudAmiById(id);
        if (!sol) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        } else {
            const SolActu = Model.updateSolicitudAmi(id, req.body);
            res.status(200).json({ message: 'Solicitud Modificada', SolActu });
        }
    }
}

exports.deleteSolicitudAmistad = (req, res) => {
    const { id } = req.params;
    const { idAmigo } = req.body;
    if (!idAmigo) {
        return res.status(400).json({ error: 'Se requiere el idAmigo para eliminar la amistad' });
    } else {
        console.log(id)
        console.log(idAmigo)
        const sol = Model.getSolicitudAmiByIdUserIdFriend(id, idAmigo);
        if (!sol) {
            return res.status(404).json({ error: 'no son amigos' });
        } else {
            Model.deleteSolicitudAmistad(sol.id);
            res.status(200).json({ message: 'Solicitud Eliminada' });
        }
    }
}