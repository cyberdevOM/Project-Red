const Sequelize = require('sequelize');
const sequelize = require('./database');
const fs = require('fs');

const { 
    Users, 
    UserItems, 
    CurrencyShop, 
    UserPet, 
    PetShop, 
    Pets
} = require('./dbObjects'); 

const force = process.argv.includes('--force') || process.argv.includes('-f');

let items = JSON.parse(fs.readFileSync('./utils/items.json', 'utf8'));
let pets = JSON.parse(fs.readFileSync('./utils/pets.json', 'utf8'));

sequelize.sync({ force: true })
    .then(async () => {
        const shop = items.map(item => CurrencyShop.upsert(item));
        const pet = pets.map(pet => PetShop.upsert(pet));

        await Promise.all(shop, pet);
        console.log('Database synced');
        sequelize.close();
    }).catch(console.error);
