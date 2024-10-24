const express = require('express');
const app = express();

const routesUsers = require('./routes/routesuser.js');
const routesPublicaciones = require('./routes/routespublicaciones.js');
const routesAmi = require('./routes/routesamistad.js');
const routesfeed = require('./routes/routesfeed.js');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());

app.use('/api/users', routesUsers);
app.use('/api/publi', routesPublicaciones);
app.use('/api/amistad', routesAmi);
app.use('/api/feed', routesfeed);

const { getPubli, getUsers, getFeed } = require('./models/models.js');
app.get('/home', (req, res) => {
    const publicaciones = getPubli();
    res.render('index', { welcomeMessage: 'Bienvenido', publicaciones: publicaciones });
});
app.get('/users', (req, res) => {
    const users = getUsers();
    res.render('users', { welcomeMessage: 'Usuarios Registrados', users: users });
});
app.get('/feed', (req, res) => {
    const feed = getFeed();
    res.render('feed', { welcomeMessage: 'Bienvenido a feed de user', feed: feed });
});
app.get('/', (req, res) => {
    res.send('Por favor, diríjase a la ruta /home');
});
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});