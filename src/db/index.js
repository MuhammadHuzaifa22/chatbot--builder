// import module
import mongoose from "mongoose";

// connect data base function
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection FAILED ", error);
    process.exit(1);
  }
};

// export function
export default connectDB;
