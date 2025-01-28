import mongoose from 'mongoose';
import { MONGO_URI } from '../utils/constants';


const connectDB = async (): Promise<void> => {

  if (!MONGO_URI) {
    console.error('MONGODB_URI environment variable is not defined.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);

    console.log('✅ Successful connection to MongoDB established.');
  } catch (error) {
    console.error('❌ An error occurred while connecting to MongoDB:', error);
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection status: Connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection status: Disconnected');
  });

  // Node.js jarayoni tugaganda, MongoDB ulanishini yopish
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('The MongoDB connection was closed and the process was terminated.');
    process.exit(0);
  });
};

export default connectDB;
