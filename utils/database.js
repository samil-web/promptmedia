import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    // connect db to mongoose
    if (isConnected) {
        // console log
        console.log("Is already connected")
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'shared_prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}