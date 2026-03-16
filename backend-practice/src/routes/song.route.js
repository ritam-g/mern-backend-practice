import express from 'express';
import { upload } from '../middleware/uplode.middleware.js';
import { songUpload } from '../controller/song.controller.js';

const songRoute = express.Router()

//NOTE - thsi upload sing le file will pass as req.file 
songRoute.post('/', upload.single('song'), songUpload)

export default songRoute;
