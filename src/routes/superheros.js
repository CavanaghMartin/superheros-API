const { superhero, favorite } = require('../db.js');
const { Router } = require('express');
const Sequelize = require("sequelize");



const router = Router();


//find superhero by name
router.get('/:heroName', function (req, res) {
    const { heroName } = req.params;
    superhero.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: '%' + heroName + '%'
            }
        },
    })
        .then(heros => {
            res.send(heros)
        })
        .catch(err => console.error(err));
})




module.exports = router