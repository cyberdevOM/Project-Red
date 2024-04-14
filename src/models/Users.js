const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    exp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    expToNextLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
    },
}, {
    timestamps: false,
});

module.exports = User;