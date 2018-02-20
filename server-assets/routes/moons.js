var router = require('express').Router();
var Moons = require('../models/moon');

// GET ALL MOONS
router.get('/api/moons', (req, res, next) => {
    Moons.find({})
    .then(moons => {
        res.send(moons);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

// GET A MOONS BY ID
router.get('/api/moons/:id', (req, res, next) => {
    Moons.findById(req.params.id)
        .then(moon => {
            if (!moon) {
                res.status(400).send({ error: 'Invalid id' });
            }
            return res.send(moon);
        })
        .catch(err => res.status(500).send(err));
});

// CREATE A PLANET
router.post('/api/moons', (req, res, next) => {
    Moons.create(req.body)
        .then(moon => {
            res.send(moon);
        })
        .catch(err => res.status(400).send(err));
});


function findById(collection, id) {
    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];
        if (element.id == id) {
            return element;
        }
    }
}
router.get('*', (req, res, next) => {
    res.status(404).send('<h1>404</h1>');
});

module.exports = router;