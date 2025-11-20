import express from 'express'
const authrouter = express.Router()
import {body} from 'express-validator'


// components 
import {
    userRegestation,
    userLogin
} from '../components/users.logic.js'

//  Regestation pages 


authrouter.post('/regestor',[

    body("name")
        .trim(),

    body("username")
        .trim()
        .isLength({min:3}).withMessage("Username should be at least 3 character long")
        .notEmpty().withMessage("This fild is required"),

    body("email")
        .isEmail().withMessage("Enter a valid email")
        .normalizeEmail()
        .notEmpty().withMessage("This fild is required"),

    body("password")
        .isLength({min:6}).withMessage('password should be at least 6 character long')
        .notEmpty().withMessage("This fild is required")

],userRegestation)

// Login page


authrouter.post('/login',[

        body("email")
        .isEmail().withMessage("Enter a valid email")
        .notEmpty().withMessage("This fild is required")
        .normalizeEmail(),

        body("password")
        .isLength({min:6}).withMessage('password should be at least 6 character long')

],userLogin)

export default authrouter