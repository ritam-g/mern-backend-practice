async function practiceConteroller(req,res,next) {
    try {
        const {name}=req.body
       if(!name){
         throw new Error("name is requried");
       
       } 
       return res.status(200).json({
        message:'ok'
       })
    } catch (err) {
        err.status=401
        next(err)
    }
}
module.exports=practiceConteroller