import multer from 'multer';

//NOTE - here we have define strage 
//REVIEW - we are going with memory 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


export { upload };
