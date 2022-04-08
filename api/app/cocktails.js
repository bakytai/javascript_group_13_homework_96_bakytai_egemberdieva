const express = require('express');
const Cocktail = require('../models/Cocktail');
const auth = require("../middleware/auth");
const path = require("path");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get("/", async (req, res, next) => {
    try {
        let cocktails;
        const role = req.get('role');

        if (role === 'anonymous' || role === 'user') {
            cocktails = await Cocktail.find({is_published: true});
        }

        if (role === 'admin') {
            cocktails = await Cocktail.find();
        }

        return res.send(cocktails);
    } catch(e) {
        next(e);
    }
});

router.get('/myCocktails', auth ,async (req,res, next) => {
    try {
        const cocktails = await Cocktail.find({user: req.user._id});
        return res.send(cocktails);
    } catch (e) {
        next(e);
    }
})

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.recipe || !req.body.ingredients) {
            return res.status(400).send({message: 'fields are required'});
        }

        const cocktailData = {
            user: req.user._id,
            title: req.body.title,
            recipe: req.body.recipe,
            image: null,
            is_published: false,
            ingredients: JSON.parse(req.body.ingredients)
        };

        if (req.file) {
            cocktailData.image = req.file.filename;
        }

        if(req.user.role === 'admin') {
            cocktailData.is_published = true
        }

        const cocktail = new Cocktail(cocktailData);

        await cocktail.save();

        return res.send({message: 'Created new cocktail', id: cocktail._id});
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async ( req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {
            await Cocktail.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted cocktail!'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});

router.post('/:id/publish', auth, async (req,res,next) => {
    try {
        if (req.user.role === 'admin') {
            const isPublishCocktail = await Cocktail.findById(req.params.id);
            isPublishCocktail.is_published = true;
            isPublishCocktail.save();
            return res.send({message: 'Published cocktail!'});
        }

        return res.send({message: 'You cannot modify!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;