import { timeStamp } from 'console'
import mongoose from 'mongoose'
import { type } from 'os'
import { title } from 'process'

const postSchema = new mongoose.Schema({
    title : {
        type:String,
        require:true
    },

    slug : {
        type:String,
        require:true
    },

    content : {
        type:String,
        require:true
    },
    category :{
        type :String,
        default :"new"
    },
    tags : {
        type:String,
        default:"untags"
    }
},timeStamp)


const posts = mongoose.model("post",postSchema)

export default posts