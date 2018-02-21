var router = require('express').Router();
var Planets = require('../models/planet');

// GET ALL PLANETS
router.get('/api/planets', (req, res, next) => {
    Planets.find({})
        .then(planets => {
            res.send(planets);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// GET A PLANET BY ID
router.get('/api/planets/:id', (req, res, next) => {
    Planets.findById(req.params.id)
        .then(planet => {
            if (!planet) {
                res.status(400).send({ error: 'Invalid id' });
            }
            return res.send(planet);
        })
        .catch(err => res.status(500).send(err));
});

// or all of these .catches could be:
// .catch(next) 
// if we make a GENERIC ERROR HANDLER
// server.use("*", (error, req, res, next) => {
//     res.status(400).send(error);
// });


// CREATE A PLANET
router.post('/api/planets', (req, res, next) => {
    Planets.create(req.body)
        .then(planet => {
            res.send(planet);
        })
        .catch(err => res.status(400).send(err));
});

// DELETE A PLANET
// come back here
router.delete('/api/planets/:id', (req, res, next) => {
    Planets.findByIdAndRemove(req.params._id, (err, planet) => {
        console.log("Planet successfully deleted!")
    });
});

function findById(collection, id) {
    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];
        if (element.id == id) {
            return element;
        }
    }
}

module.exports = router;