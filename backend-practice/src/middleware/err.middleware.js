async function handelErr(err, req, res, next) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong";
    return res.status(statusCode || err.status || 402).json({
        message: message || err.message,
        success:err.status || false
    })
}

export default handelErr;
