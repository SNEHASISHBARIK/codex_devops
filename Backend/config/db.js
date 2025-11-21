import mongoose from "mongoose";

const connectDB = async (mongoURL) => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Mongo Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
