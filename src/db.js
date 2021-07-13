require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/marvel`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// We read all the files from the Models folder, require them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

//  We inject the connection (sequelize) to all models
modelDefiners.forEach(model => model(sequelize));

// In sequelize.models are all imported models as properties
// To relate them we do a destructuring
const { superhero,favorite } = sequelize.models;

superhero.hasOne(favorite, { foreignKey: "superheroId" });
favorite.belongsTo(superhero);


module.exports = {
  ...sequelize.models, // for import the models: const { User } = require('./db.js');
  conn: sequelize,     // for import the conection { conn } = require('./db.js');
};
