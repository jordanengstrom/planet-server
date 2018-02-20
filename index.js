var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var server = express();
var port = 3000;

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var planets = [];
var id = -1;

function Planet(config) {
    id++;
    this.id = id,
        this.name = config.name,
        this.life = config.life,
        this.type = config.type,
        planets.push(this);
}

new Planet ({ name: 'Alderaan', life: false, type: 'earth-like terrestrial' });
new Planet ({ name: 'Tatooine', life: true, type: 'desert terrestrial' });
new Planet ({ name: 'Bespin', life: true, type: 'gas giant' });
new Planet ({ name: 'Dagobah', life: true, type: 'swamp terrestrial' });
new Planet ({ name: 'Hosnian Prime', life: true, type: 'urbanized terrestrial'});
new Planet ({ name: 'Cantonica', life: true, type: 'desert terrestrial'});

server.get('*', (req, res, next) => {
    console.log('I am being requested');
    next();
})

server.get('/planets', (req, res, next) => {
    res.send(planets);
})

server.get('/planets/:id', (req, res, next) => {
    var aPlanet = findById(planets, req.params.id);
    if (aPlanet) {
        return res.send(aPlanet);
    }
});

server.post('/planets', (req, res, next) => {
    var planet = new Planet(req.body);
    var responseObject = {
        message: 'Successfully created a new planet!',
        data: planet
    }
    res.send(responseObject);
})


function findById(collection, id) {
    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];
        if (element.id == id) {
            return element;
        }
    }
}


server.get('*', (req, res, next) => {
    res.status(404).send('<h1>404</h1>')
});

server.listen(port, () => {
    console.log('Server running on port: ', port);
});