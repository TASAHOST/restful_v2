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

routes.get("/restaurants", async(req, res)=>{
    try {
        const restaurants = await Restaurant.getAll();
            res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({error:"failed to ger all restaurants"});
    }
})

routes.get("/restaurants/:id", async(req, res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurant = Restaurant.getById(restaurantId);
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json({error:"failed to get restaurant by id"});
    }
})

routes.put("/restaurants/:id", async (req,res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurantData = req.body;
        const updatesRestaurant = await Restaurant.updateById(restaurantId);
        res.status(200).json(updateRestaurant);
    } catch (error) {
        if (error.kind === "not_Found") {
            res.status(400).json({error:"Restaurant not found"});
        }else {
            res.status(500).json({error: "Failed to up restaurant data"});
        }
    };
})

routes.delete("/restaurant/.id", async (req, res)=>{
    try {
        const restaurantId = req.params.id;
        const isDelete = await Restaurant.removeById(restaurantId);
        if (isDelete) {
            res.status(204).json({message: "Restaurant id " + restaurantId + "is deleted", isDeleted: isDeleted,});
        }
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(404).json({error: "Restaurant not found"});
        }else {
            res.status(500).json({error: "failed to update restaurant data"});
        }
    }
});

module.exports = routes;