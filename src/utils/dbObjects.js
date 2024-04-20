const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const Users = require('../models/Users');
const UserItems = require('../models/UserItem');
const CurrencyShop = require('../models/CurrencyShop');
const UserPet = require('../models/UserPets');
const PetShop = require('../models/PetShop');
const Pets = require('../models/Pets');

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });
UserPet.belongsTo(PetShop, { foreignKey: 'pet_id', as: 'pet' });

Reflect.defineProperty(Users.prototype, 'addItem', {
    
    value: async function(item) {
        const userItem = await UserItems.findOne({
            where: { user_id: this.user_id, item_id: item.id},
            include: ['item'],
        });

        if (userItem) {
            userItem.amount += 1;
            return userItem.save();
        } else {
            return UserItems.create({ user_id: this.user_id, item_id: item.id, item_name: item.name, amount: 1 });
        }
    }
});

Reflect.defineProperty(Users.prototype, 'getItems', {
    value: () => {
        return UserItems.findAll({
            where: { user_id: this.user_id },
            include: ['item'],
        });
    },
});

Reflect.defineProperty(Users.prototype, 'addPet', {
    value: async function(pet) {
        return UserPet.create({ user_id: this.user_id, pet_id: pet.id, pet_name: pet.name, pet_description: pet.description});
    }
});

module.exports = { Users, UserItems, CurrencyShop, UserPet, PetShop, Pets};