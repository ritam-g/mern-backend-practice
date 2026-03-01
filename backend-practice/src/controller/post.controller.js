async function postController(req,res) {
   const {id}=req.user 
   const {desc}=req.body
   console.log(req.file);
   console.log('hit');
   return res.status(201).json({
    message:'sucess',
    fie:req.file.buffer
   })
   
   
}
module.exports={postController}