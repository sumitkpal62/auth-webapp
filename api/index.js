import express from 'express';
import connectDB from './config/db.js';


const PORT = 4000;
const app = express();

app.use(express.json())

// Connect DB

connectDB();


app.get("/", (req, res)=>{
    res.json({
        name:"Sumit",
        education: "Graduation"
    })
})

app.post("/user", async(req, res)=>{
    const {username, batch} = req.body
    try {
        res.status(200).json({
            Name: username,
            Class: batch
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!"
        })
    }
})


app.listen(PORT, ()=>{
    console.log(`Server started at Port: ${PORT}`);
})