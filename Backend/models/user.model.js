import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        require:true,
        trim:true
    },
    username : {
        type :String,
        require:true,
        trim:true,
        unique :true
    },
    email : {
        type : String,
        require :true,
        trim:true,
        unique:true
    },
    Password : {
        type:String,
        require:true,
    }
})


const users = mongoose.model("user",userSchema)

export default users