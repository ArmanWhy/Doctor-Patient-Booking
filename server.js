import express from "express";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port  http://localhost:${PORT}`);
    });
});
