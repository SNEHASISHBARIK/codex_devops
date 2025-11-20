import express from 'express'
import dotenv from 'dotenv' ; dotenv.config()
import debug from 'debug'
import cookieparser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

// Fix for ES Modules path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- View Engine (Frontend Folder) ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static(path.join(__dirname, "../frontend/public")));

import expressLayouts from "express-ejs-layouts";
app.use(expressLayouts);
app.set("layout", "layout");


// ---- Middlewares ----
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

// ---- FRONTEND Pages ----
app.get("/", (req,res)=> res.render("home", { title: "Home" }))
app.get("/login", (req,res)=> res.render("login", { title: "Login" }))
app.get("/register", (req,res)=> res.render("register", { title: "Register" }))

// ---- API Routes ----
import authrouter from './routes/auth.routes.js'
app.use('/api',authrouter)

import postrouter from './routes/posts.route.js'
app.use("/api",postrouter)


// ---- DB & Server ----
import connectDB from './config/db.js'
connectDB(process.env.MONGODB_URL).then(()=>{
    app.listen(process.env.PORT,()=>{
        const applog = debug("development:app")
        applog(`server up ! http://localhost:${process.env.PORT}`)
    })
})
