import users from '../models/user.model.js'
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import {tokengenerator} from '../utils/TokenGeneretor.js'

// Regestation logic :

const userRegestation = async (req,res) =>{
    try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({error : error.array()})
            }

            const {name,username,email,password} = req.body

            const email_check = await users.findOne({email})
            const username_check = await users.findOne({username})
            if (username_check) return res.status(400).json({message :'username alredy exist'})
            if (email_check) return res.status(400).json({message :' email alredy exist'})

            const hashPassword = await bcrypt.hash(password,10)

            const newUser = new users({
                name,
                username,
                email,
                Password: hashPassword
            })

            await newUser.save()
            res.status(201).json({ message: 'User registered successfully' })

        } catch (error) {
            res.status(500).json({message:"regestation failed",error:error})
        }
}


//  Login logic :

const userLogin = async (req,res)=>{
    try {
        const error = validationResult(req)
        if (!error.isEmpty()){
            return res.status(400).json({error : error.array()})
        }

        const {email,password} = req.body
        const user = await users.findOne({email})
        if(!user) {
            return res.status(400).json({message : "email not exist , plese regestor"})
        }
        const checkPassword = await bcrypt.compare(password,user.Password)
        if (!checkPassword){
            return res.status(400).json({message :'incorrect username or password , Try again'})
        }

        const token = await tokengenerator(user)

        if (!token) return res.status(500).json({message:"somthing got wrong"})
        res.cookie("token",token)
        res.status(200).json({message:"user login sucesfully",token})
        

    } catch (err) {
        res.status(400).json({message : 'failed to login',
            error :err.message
        })
    }
}

export {
    userRegestation,
    userLogin
}