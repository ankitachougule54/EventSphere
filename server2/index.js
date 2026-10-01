import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import UserRouter from './routes/UserRouter.js';
import itemRouter from './routes/itemRouter.js';
import path from 'path';
import employeeRouter from './routes/EmployeeRouter.js';
import GalleryRouter from './routes/GalleryRouter.js';
import TechRouter from './routes/TechRouter.js';
import EventRouter from './routes/EventRouter.js';
import AdminRouter from './routes/AdminRouter.js';
import EventRegistrationRouter from './routes/EventRegistrationRouter.js';
import ContactRouter from './routes/ContactRouter.js';





dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log(
  "EMAIL_PASSWORD exists:",
  !!process.env.EMAIL_PASSWORD
);

// Use Google DNS for MongoDB SRV lookup
dns.setServers(['8.8.8.8']);

const app = express();

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.get("/test-admin", (req, res) => {
  res.json({
    message: "Admin route is working"
  });
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// User routes
app.use('/users', UserRouter);

// Check MongoDB URL
if (!URL) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
}

// Connect to MongoDB and start server
mongoose
    .connect(URL)
    .then(() => {
        console.log('✅ Database connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:');
        console.error(error.message);
    });



app.use("/item", itemRouter);
app.use("/employee", employeeRouter)
app.use("/gallery", GalleryRouter)
app.use("/tech", TechRouter);
app.use("/events", EventRouter)
app.use("/admin", AdminRouter)
app.use(
  "/event-registration",
  EventRegistrationRouter
);

app.use("/contact", ContactRouter);