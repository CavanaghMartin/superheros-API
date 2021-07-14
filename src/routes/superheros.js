const { superhero, favorite } = require('../db.js');
const { Router } = require('express');
const Sequelize = require("sequelize");



const router = Router();


//find superhero by name
router.get('/:heroName', function (req, res) {
    const { heroName } = req.params;
    const { page } = req.query;
    let pageSize=3
    if(page>0){

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
    }else{
        res.send("page cannot be under 0")
    }
})




module.exports = router