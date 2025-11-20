import mongoose from 'mongoose'
import debug from 'debug'
const dblog = debug("development:db")

const connectDB = async (url) =>{
    try {
        await mongoose.connect(url)
        dblog("DB connected ...")
        return true
    } catch (error) {
        console.error(error)
    }
}

export default connectDB