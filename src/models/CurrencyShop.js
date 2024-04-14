const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const CurrencyShop = sequelize.define('CurrencyShop', {
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
});

module.exports = CurrencyShop;