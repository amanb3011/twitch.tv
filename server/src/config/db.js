import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to the mongoDB database");
  } catch (error) {
    console.log("could not connect to the database");
    console.log(error);
    process.exit(1);
  }
};

export default connect;
