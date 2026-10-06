import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("Database connected");
    } else {
      console.log("Database failed to connect");
    }
  } catch (err) {
    console.log("Error:", err);
  }
};
