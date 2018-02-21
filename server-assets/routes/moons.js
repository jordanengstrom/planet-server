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

// DELETE A MOON
router.delete('/api/planets/:id', (req, res, next) => {
    Moons.findByIdAndRemove(req.params.id, (err, planet) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Planet successfully deleted",
            id: planet.id
        };
        return res.status(200).send(response);
    });
});

// UPDATE A MOON
router.put('/api/planets/:id', (req, res, next) => {
    Moons.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, planet) => {
            if (err) return res.status(500).send(err);
            return res.send(planet);
        });
});

// function findById(collection, id) {
//     for (let i = 0; i < collection.length; i++) {
//         const element = collection[i];
//         if (element.id == id) {
//             return element;
//         }
//     }
// }

module.exports = router;