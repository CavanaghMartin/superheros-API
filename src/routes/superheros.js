const { superhero, favorite } = require('../db.js');
const { Router } = require('express');
const Sequelize = require("sequelize");



const router = Router();

//get  http://localhost:3001/superheros/ca?page=2
//find superhero by name
router.get('/:heroName', function (req, res) {
    const { heroName } = req.params;
    var { page } = req.query;
    let pageSize=5
    if(!page){
         page=1

    }

        superhero.findAll({
            where: {
                name: {
                    [Sequelize.Op.iLike]: '%' + heroName + '%'
                }
            },
           limit: pageSize,
        offset: (page-1)*pageSize
        })
        .then(heros => {
            res.send(heros)
        })
        .catch(err => console.error(err));
    
})




module.exports = router