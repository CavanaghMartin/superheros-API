const { superhero } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const {APIKEY} = process.env;

const populate = () => {
        for (let i = 0; i < 14; i++) {
            
            axios(`https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=${i*100}&${APIKEY}`)
            
            .then(result => {
                result.data.data.results.forEach(hero => {
                    const { name, description, thumbnail: { path, extension } } = hero;
                    
                    superhero.findOrCreate({
                        where: {
                            name,
                            description,
                            photo: path + "." + extension
                        }
                    })
                    

                });
            })
            .catch(error => {
                console.log("cant connect to db")
            })
            
            
        }

        superhero.findAll()
            .then(heros => {
              console.log("loaded correctly in db")
            })
            .catch(err => { console.log("error:" + "superheros cant be loaded in  db") })

    

}

module.exports = populate;
