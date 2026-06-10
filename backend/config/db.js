import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB Connected Successfully: ${connection.connection.host}`
    );
  } catch (error) {
    console.log("Error in connecting the database", error);
    process.exit(1);
  }
};

export default connectDB;