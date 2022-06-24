/**
 * This File contains the connection with the database
 */
import mongoose from "mongoose";

// Method to connect with the database
export const connectDB = async () =>{
    try{
        // MongoDB conenction string
        const con = await mongoose.connect(process.env.MongoURI, {useUnifiedTopology: true});
        console.log(`MongoDB Connected: ${con.connection.host}`);

    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
    
}