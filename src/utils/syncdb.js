const Sequelize = require('sequelize');
const sequelize = require('./database');
const fs = require('fs');

const CurrencyShop = require('../models/CurrencyShop');
require('../models/Users');
require('../models/UserItem');

const force = process.argv.includes('--force') || process.argv.includes('-f');

let items = JSON.parse(fs.readFileSync('./utils/items.json', 'utf8'));

sequelize.sync({ force })
    .then(async () => {
        const shop = items.map(item => CurrencyShop.upsert(item));
        await Promise.all(shop);
        console.log('Database synced');
        sequelize.close();
    }).catch(console.error);
