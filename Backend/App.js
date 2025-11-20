import express from 'express'
import dotenv from 'dotenv' ; dotenv.config()
import debug from 'debug'
import cookieparser from 'cookie-parser'

const app = express()

// Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

// Routes 
import authrouter from './routes/auth.routes.js'
app.use('/api',authrouter)

import postrouter from './routes/posts.route.js'
app.use("/api",postrouter)



// Db Connection and server up 
import connectDB from './config/db.js'
connectDB(process.env.MONGODB_URL).then(()=>{
    app.listen(process.env.PORT,()=>{
        const applog = debug("development:app")
        applog(`server up ! http://localhost:${process.env.PORT}`)
    })
})