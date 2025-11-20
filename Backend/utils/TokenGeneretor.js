import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';dotenv.config()


const tokengenerator =  (user)=>{
    let token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_KEY,
    {expiresIn : "7d"})

    return token
}

export {tokengenerator}