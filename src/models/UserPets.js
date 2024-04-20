const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const UserPet = sequelize.define('UserPet', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pet_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pet_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // pet hp and attack for battle system to come later
}, {
    timestamps: false,
    sequelize,
    modelName: 'UserPets',
});

module.exports = UserPet ;