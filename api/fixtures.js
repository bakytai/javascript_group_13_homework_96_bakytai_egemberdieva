const mongoose = require('mongoose');
const config = require('./config');
const User = require("./models/User");
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [sara, john] = await User.create({
        email: 'sara@gmail.com',
        password: '000',
        displayName: 'sara',
        role: 'admin',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'john@mail.ru',
        password: '000',
        displayName: 'john',
        role: 'user',
        token: '8enDI2paOqusBavVWOnwL'
    });

    const [longI, aperol, mojito, margarita] = await Cocktail.create({
        user: sara,
        title: 'Long-Island iced tea',
        image: 'Long_island_iced_tea-1-4s.jpg',
        recipe: 'This super-sized cocktail recipe serves 8 to 12 people.If one cocktail is all you want, ' +
            'use 1 tablespoon each of tequila, rum, vodka, gin, and triple sec 1 1/2 tablespoons each of' +
            ' lemon juice and simple syrup; and about 3 tablespoons of cola.',
        is_published: true,
        ingredients: [{
                title: 'tequila',
                amount: '1 tablespoon'
            }, {
                title: 'vodka',
                amount: '1 tablespoon'
            }, {
                title: 'Cola',
                amount: '100 ml'
            }, {
                title: 'lemon juice',
                amount: '3 tablespoon'
            }
        ]
    }, {
        user: sara,
        title: 'Aperol Spritz',
        image: 'Select_Spritz.jpg',
        recipe: 'Aperol spritz cocktails are unbelievably easy to make. No cocktail shaker or fancy equipment required!\n' +
            '\n' +
            'You’ll simply fill a wine glass with ice, then add Aperol, Prosecco, club soda and a slice of orange.',
        is_published: false,
        ingredients: [{
            title: 'Aperol',
            amount: '100 ml'
        }, {
            title: 'Prosecco',
            amount: '100 ml'
        }, {
            title: 'Club soda',
            amount: '20 ml'
        }, {
            title: 'Slice of fresh orange',
            amount: '60 g'
        }]
    }, {
        user: john,
        title: 'Mojito',
        image: 'best-mojito-recipe-2.jpg',
        recipe: 'Muddle the lime juice, sugar and mint leaves in a small jug, crushing the mint as you go – you can use the end of a' +
            ' rolling pin for this. Pour into a tall glass and add a handful of ice. Pour over the rum, stirring with a long-handled spoon. ' +
            'Top up with soda water, garnish with mint and serve.',
        is_published: true,
        ingredients: [{
            title: 'juice of lime',
            amount: '1 lime'
        }, {
            title: 'white rum',
            amount: '60ml'
        }, {
            title: 'granulated sugar',
            amount: '1 teaspoon'
        }, {
            title: 'Soda water',
            amount: 'to taste'
        }]
    }, {
        user: john,
        title: 'Margarita',
        image: 'best-margarita-recipe-5.jpg',
        recipe: 'Muddle the lime juice, sugar and mint leaves in a small jug, crushing the mint as you go – you can use the ' +
            'end of a rolling pin for this. Pour into a tall glass and add a handful of ice. Pour over the rum, stirring with a ' +
            'long-handled spoon. Top up with soda water, garnish with mint and serve.',
        is_published: false,
        ingredients: [{
            title: 'juice of lime',
            amount: '1 lime'
        }, {
            title: 'white rum',
            amount: '60ml'
        }, {
            title: 'granulated sugar',
            amount: '1 teaspoon'
        }, {
            title: 'Soda water',
            amount: 'to taste'
        }, {
            title: 'mint leaves',
            amount: 'small handful'
        }]
    })

    await mongoose.connection.close();
};

run().catch(e => console.log(e));