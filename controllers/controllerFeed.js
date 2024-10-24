const Model = require('../models/models.js');

exports.getFeedId = (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'ID tiene que ser enviado' });
    }
    res.json(Model.getFeedID(id));
};

exports.getFeed = (req, res) => {
    res.json(Model.getFeed());
}