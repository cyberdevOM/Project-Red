const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const Users = require('../models/Users');
const UserItems = require('../models/UserItem');
const CurrencyShop = require('../models/CurrencyShop');

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });

Reflect.defineProperty(Users.prototype, 'addItem', {

    value: async item => {
        const userItem = await UserItems.findOne({
            where: { user_id: this.user_id, item_id: item.id },
        });

        if (userItem) {
            userItem.amount += 1;
            return userItem.save();
        }

        return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
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

module.exports = { Users, UserItems, CurrencyShop };