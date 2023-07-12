const express = require("express");
const cors = require("cors");

const app = rxpress();

app.use(cors());
app.ues(express.jsonI());
app.use(express.urlencoded({extended:false}));

app,get("/", (req,res)=>{
    res.send("<h1>Hello World</h1>");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})