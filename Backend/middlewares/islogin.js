import jwt from 'jsonwebtoken'
import {tokengenerator} from '../utils/TokenGeneretor.js'
import users from '../models/user.model.js'
import dotenv from 'dotenv' ;dotenv.config()

const key = process.env.JWT_KEY

const islogin = async (req,res,next)=>{
    if(!req.cookies?.token){
       return res.status(400).json("You need to login first")
    }

    try {
        let decode = jwt.verify(req.cookies.token,key)
        let user = await users.findOne({email : decode.email})
        req.user = user
        res.set("Cache-Control","no-store")
        next()
    } catch (error) {
        res.status(500).json({message : "something went wront , plese try again later"})
    }
}

export {islogin}