async function testingError(req, res, next) {
    //! testing will be like number should be less than 5
    try {
        const { nums } = req.body
        if (nums > 5) {
            throw new Error("it should be less than 5");

        }
    } catch (err) {
        err.status = 401
        next(err)
    }
}
export default testingError;
