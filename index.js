// LIBRARIES
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var server = express();
var port = 3000;

require('./server-assets/db/mlab-config');

//ROUTES
let planetRoutes = require('./server-assets/routes/planets');
let moonRoutes = require('./server-assets/routes/moons');


// SERVER SETUP
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res, next) => {
    res.send("testing 123");
});

server.use(planetRoutes);
server.use(moonRoutes);

// STARTS THE SERVER
server.listen(port, () => {
    console.log('Server running on port: ', port);
});