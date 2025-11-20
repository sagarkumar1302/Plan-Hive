import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: DB_NAME,
        })
        console.log("Mongodb Connected ", connect.connection.host);

    } catch (error) {
        console.log("Mongodb not connected. Error while connecting the mongodb");
        process.exit(1);
    }
}
export default connectDB;