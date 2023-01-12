const express = require ('express');
const multer = require('multer')
const Router = express.Router();
const DIR = './results/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

Router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        console.log(req.file)
        const uploadedImage = req.file.filename
        res.status(200).send({success: true, uploadedImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})


module.exports = Router