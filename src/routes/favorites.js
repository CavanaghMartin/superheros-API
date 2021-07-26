const { favorite, superhero } = require('../db.js');
const { Router } = require('express');

const router = Router();

//find all favorites
//get  http://localhost:3001/favorites/
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
//post  http://localhost:3001/favorites/1223
router.post('/:id', function (req, res) {
    const { id } = req.params
    favorite.create({ superheroId: id })
        .then(resp => res.json(resp))
        .catch(err => res.send("already added"));
})

//delete favorite by id
//delete  http://localhost:3001/favorites/2
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