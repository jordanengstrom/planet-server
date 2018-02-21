var router = require('express').Router();
var Stars = require('../models/star');

// GET ALL STAR
router.get('/api/star', (req, res, next) => {
    Stars.find({})
        .then(stars => {
            res.send(stars);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// GET A PLANET BY ID
router.get('/api/stars/:id', (req, res, next) => {
    Stars.findById(req.params.id)
        .then(star => {
            if (!star) {
                res.status(400).send({ error: 'Invalid id' });
            }
            return res.send(star);
        })
        .catch(err => res.status(500).send(err));
});

// or all of these .catches could be:
// .catch(next) 
// if we make a GENERIC ERROR HANDLER
// server.use("*", (error, req, res, next) => {
//     res.status(400).send(error);
// });


// CREATE A STAR
router.post('/api/stars', (req, res, next) => {
    Stars.create(req.body)
        .then(star => {
            res.send(star);
        })
        .catch(err => res.status(400).send(err));
});

// DELETE A PLANET
router.delete('/api/stars/:id', (req, res, next) => {
    Stars.findByIdAndRemove(req.params.id, (err, star) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Star successfully deleted",
            id: star.id
        };
        return res.status(200).send(response);
    });
});

// UPDATE A PLANET
router.put('/api/stars/:id', (req, res, next) => {
    Stars.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, star) => {
            if (err) return res.status(500).send(err);
            return res.send(star);
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