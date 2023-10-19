import mongoose from 'mongoose';

let connection: typeof mongoose

export const connectMongoDB = async () => {
    try {
        if (!connection) {
            // await mongoose.connect(process.env.MONGODB_URI!);
            await mongoose.connect(process.env.MONGODB_CONNECT_URI!);
        }
        return connection
    } catch (e) {
        throw new Error('Error in connecting to database')
    }
}