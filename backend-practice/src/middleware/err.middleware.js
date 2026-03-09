async function handelErr(err, req, res, next) {
    console.log(err);
    
    return res.status(err.status).json({
        message:err.message,
        stack:err.stack
    })
}

module.exports=handelErr