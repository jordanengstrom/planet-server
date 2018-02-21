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
router.delete('/api/planets/:id', (req, res, next) => {
    Planets.findByIdAndRemove(req.params.id, (err, planet) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Planet successfully deleted",
            id: planet.id
        };
        return res.status(200).send(response);
    });
});

// UPDATE A PLANET
router.put('/api/planets/:id', (req, res, next) => {
    Planets.findByIdAndUpdate(
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