import mongoose from 'mongoose';

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB is connected');

    } catch (err) {
        console.log(err);

    }
}
export default connectToDB;
