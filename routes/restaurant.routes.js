const express = require("express");
const routes = express.Router();
const Restaurant = require("../controller/restaurant.controller");


//http://localhost:5000/restaurant
routes.post("/restaurants",async (req,res)=>{
    try {
       
        const newRestaurant = req.body;
        console.log(newRestaurant);
        const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
        
        res.status(201).json(createRestaurant);
         
       
    } catch (error) {
        
        res.status(500).json({error: "Failed to create restaurant"});
    }
});

module.exports = routes;