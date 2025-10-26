import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app=express();
app.use(cors());
app.use(express.json());

const port=5000;

app.get("/", (req, res)=>{
   res.send("hello world");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})