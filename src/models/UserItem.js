const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const UserItem = sequelize.define('UserItem', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = UserItem;