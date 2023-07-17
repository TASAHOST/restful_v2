const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurant.routes")
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.send("<h1>Hello World</h1>");
})
app.use("/",restaurantRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})