import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log("No connection in process.env.MONGO_CLIENT");
    }
    const con = mongoose.connect(conStr);
    con && console.log("MongoDb COnnected");
  } catch (error) {
    console.log(error);
  }
};
