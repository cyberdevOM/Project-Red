// This file contains the function that checks the user's xp and levels them up if they have enough xp to do so.
// - expCheck, check if the user has enough xp to level up and levels them up if they do.
// - exists, check if the user exists in the database, if they dont create the user and return user.
const { Users, UserItems, CurrencyShop } = require('../utils/dbObjects');

module.exports = {
    expCheck: async function (user, userData) {
        if (userData.exp >= userData.expToNextLevel) {
            userData.level += 1;
            userData.exp = 0;
            userData.expToNextLevel = Math.pow(2, userData.level) * 100;
        }

        await Users.update({
            exp: userData.exp,
            level: userData.level,
            expToNextLevel: userData.expToNextLevel,
        }, {
            where: { user_id: user.id },
        });
    },

    exists: async function (user) {
        const userData = await Users.findOne({ where: { user_id: user.id } });
        
        if (!userData) {
            userData = await Users.create({ 
                user_id: user.id, 
                username: user.username,
                balance: 0,
                exp: 0,
                level: 0,
                expToNextLevel: 100,
            });
        }

        return userData;
    },

    balanceCheck: async function (user, userData) {
        if (userData.balance < 0) {
            await Users.update({
                balance: 0,
            }, {
                where: { user_id: user.id },
            });
        }
    },

    balanceUpdate: async function (user, userData) {
        await Users.update({
            balance: userData.balance,
        }, {
            where: { user_id: user.id },
        });
    },

    addItem: async function (user, item) {
        const userData = await exists(user);
        userData.items.push(item);
        await Users.update({
            items: userData.items,
        }, {
            where: { user_id: user.id },
        });
    }
}