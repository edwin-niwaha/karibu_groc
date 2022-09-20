//dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer')

const imgModel = require('../models/imageModel');
// const imageModel = require('../models/imageModel');

// Generate a random number to name
const name = ()=> Math.floor(Math.random()*10000);

// Working with multer diskStorage method
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'allUploads/');
   },
    filename: function(req, file, cb){
        cb(null, name() + file.originalname);
       //  console.log(file);
    }
});

//used for validations
const fileFilter = (req, file, cb)=>{
    //reject a file  --file.mimetype === ''
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 7},
    fileFilter: fileFilter
});


router.post("/uploads", upload.single('image'),
(req, res) => {
    console.log(req.file)
    imgModel.create({image: req.file.path})
    res.redirect("/gallery");
});

router.get('/gallery', async(req, res) =>{
    try {
        const images = await imgModel.find()
        res.render('gallery', {images})
    } catch (error) {
        
    }
})

module.exports = router