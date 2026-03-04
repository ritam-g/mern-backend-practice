const multer = require('multer')

//NOTE - here we have define strage 
//REVIEW - we are going with memory 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


module.exports = { upload }