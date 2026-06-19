import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import router from "./routes/user.routes.js";
import feedbackrouter from "./routes/feedback.routes.js";
import captionroutes from "./routes/caption.routes.js";
import maprouter from "./routes/map.routes.js";
import ridesrouter from "./routes/rides.routes.js";
import paymentRouter from "./routes/paymentRouter.js";
import webhookRoute from "./routes/webhook.routes.js"; //  ADD THIS

const app = express();
const __dirname = path.resolve();

dotenv.config();

//  CORS
const corsOptions = {
  origin: [
    "https://fullstack-uber-13.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));


// IMPORTANT: webhook FIRST (before json)
app.use("/webhook", webhookRoute);

// Then other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
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
app.use("/payment", paymentRouter);
app.use("/feedback", feedbackrouter);


// REMOVE THIS (can cause issues)
/// app.use(express.static(process.cwd()));


//  Serve frontend
app.use(express.static(path.join(__dirname, "Frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

export default app;
