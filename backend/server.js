// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import 'dotenv/config';
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import { assets } from "../frontend/src/assets/assets.js";


// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json())
// app.use(cors())

// // DB Conneciton
// connectDB();

// // api endpoints
// app.use("/api/food" , foodRouter);
// app.use("/images", express.static('uploads'));
// app.use('/api/user' , userRouter);
// app.use('/api/cart' , cartRouter)
// app.use('/api/order' , orderRouter)

// app.get('/',(req,res) => {
//     res.send("API Working");
// })


// // Serve Frontend
// app.use(express.static(path.join(assets, "../frontend/dist")));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
// // });

// app.listen(port);




















import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Serve Frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
