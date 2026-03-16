async function handelErr(err, req, res, next) {
    console.log(err);

    return res.status(err.status || 402).json({
        message: err.message,
        stack: err.stack
    })
}

export default handelErr;
