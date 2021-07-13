const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('superhero', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
    });
};