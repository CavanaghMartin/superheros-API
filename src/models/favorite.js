const { DataTypes } = require('sequelize');

module.exports = sequelize => {

    sequelize.define('favorite', {
    superheroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  
  });
};
