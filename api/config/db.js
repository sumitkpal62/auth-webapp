import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database successfully connected");
    })
}

export default connectDB;