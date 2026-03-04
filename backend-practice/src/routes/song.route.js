const express = require('express');
const { upload } = require('../middleware/uplode.middleware');
const { songUpload } = require('../controller/song.controller');

const songRoute=express.Router()

//NOTE - thsi upload sing le file will pass as req.file 
songRoute.post('/',upload.single('song'),songUpload)

module.exports=songRoute