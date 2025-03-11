import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://khanovez:33858627@cluster0.3cugx.mongodb.net/food-del').then(() => console.log("MongooDB Connected Succesfully")).catch(() => console.log("MongooDB Connection Failed"));
}