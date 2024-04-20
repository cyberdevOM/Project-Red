const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const PetShop = sequelize.define('PetShop', {
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'PetShop',
});

module.exports = PetShop;