const { superhero } = require('../db.js');
const axios = require('axios');
const APIKEY = "ts=1&apikey=5713563fe5fbd5e2c1b244b739e8eeb5&hash=8edee7db3a4c99f6c3c72d656e102a35"

const populate = () => {

        let newArray = []

        for (let i = 0; i < 14; i++) {
            
            axios(`https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=${i*100}&${APIKEY}`)
            
            .then(result => {
                result.data.data.results.forEach(hero => {
                    const { name, description, thumbnail: { path, extension } } = hero;
                    newArray.push({ name, description, path, extension })
                    
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
                console.log(error)
            })
            
            
        }

        superhero.findAll()
            .then(heros => {
              console.log("superheros loaded correctly in db")
            })
            .catch(err => { console.log("error:" + err) })

    

}

module.exports = populate;
