import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import connectDB from "./config/db.js";

import authrouter from "./routes/auth.routes.js";
import postrouter from "./routes/posts.route.js";

const app = express();

// ---------------- PATH FIX ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

// Frontend setup
app.set("view engine", "ejs");
app.set("views", path.join(ROOT, "frontend", "views"));
app.use(express.static(path.join(ROOT, "frontend", "public")));
app.use(expressLayouts);
app.set("layout", "layout");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Frontend routes
app.get("/", (req, res) => res.render("home", { title: "Home" }));
app.get("/login", (req, res) => res.render("login", { title: "Login" }));
app.get("/register", (req, res) => res.render("register", { title: "Register" }));

// API routes
app.use("/api", authrouter);
app.use("/api", postrouter);

// DB + SERVER
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
