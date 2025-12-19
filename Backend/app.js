import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/user.routes.js';
import captionroutes from './routes/caption.routes.js';
import maprouter from './routes/map.routes.js';
import ridesrouter from './routes/rides.routes.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();

dotenv.config();

// ✅ Define corsOptions BEFORE using it
const corsOptions = {
  origin: [
    "https://fullstack-uber-12.onrender.com",  // backend (optional, not needed usually)
    "https://fullstack-uber-13.onrender.com",  // frontend
    "http://localhost:5173"                    // local dev frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

// ✅ Apply once only
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(process.cwd()));


// Routes...
app.get("/get", (req, res) => {
  res.send("hello");
});

app.get("/cors-test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.use("/users", router);
app.use("/caption", captionroutes);
app.use("/map", maprouter);
app.use("/ride", ridesrouter);

// Serve frontend
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

export default app;
