const { favorite, superhero } = require('../db.js');
const { Router } = require('express');


const router = Router();


//find all favorites
router.get('/', function (req, res) {
    superhero.findAll({

        include: {
            model: favorite,
            required: true
        },
      

    })
        .then(heros => {
            res.send(heros)
        })
        .catch(err => console.error(err));
})
//save favorite by id
router.post('/:id', function (req, res) {
    const { id } = req.params
    favorite.create({ superheroId: id })
        .then(resp => res.json(resp))
        .catch(err => res.send("already added"));
})

//delete favorite by id
router.delete('/:id', function (req, res) {
    const { id } = req.params
    favorite.findOne({ where: { superheroId: id } })
        .then((product) => {
            product.destroy()
                .then(() => res.send("removed from favorites"))
        })

        .catch(err => res.send(err).status(400));
})


module.exports = router