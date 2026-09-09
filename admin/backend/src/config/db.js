import mongoose from 'mongoose';
export default async function connectDB() { await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nobroker'); console.log('MongoDB connected'); }
