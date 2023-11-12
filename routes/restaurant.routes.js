const express = require("express");
const routes = express.Router();
const Restaurant = require("../controller/restaurant.controller");
const {authJwt} = require("../middleware")


routes.post("/restaurants",async (req,res)=>{
    try {
        const newRestaurant = req.body;
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
        res.status(500).json({error:"failed to get all restaurants"});
    }
})


routes.get("/restaurant/:id", async (req,res)=>{
    try {
        const restaurantId = req.params.id;
        const updateRestaurant = await Restaurant.getById(restaurantId)
        res.status(200).json(updateRestaurant);
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(400).json("Restaurant not found")
        }else{
            res.status(500).json({error:"failed to get Restaurant data"});
        }
    }
})

routes.put("/restaurant/:id",[authJwt.verifyToken, authJwt.isAdmin], async (req,res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurantData = req.body;
        const updateRestaurant = await Restaurant.updateById(restaurantId,restaurantData);
        res.status(200).json(updateRestaurant);
    } catch (error) {
        if (error.kind === "not_Found") {
            res.status(400).json({error:"Restaurant not found"});
        }else {
            res.status(500).json({error: "Failed to update restaurant data"});
        }
    };
})

routes.delete("/restaurant/:id",[authJwt.verifyToken, authJwt.isAdmin], async (req, res)=>{
    try {
        const restaurantId = req.params.id;
        const isDelete = await Restaurant.removeById(restaurantId);
        if (isDelete) {
        res.status(204).json({message: "Restaurant id " + restaurantId + "is deleted", isDeleted:isDelete});
        }
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(404).json({error: "Restaurant not found"});
        }else {
            res.status(500).json({error: "failed to Delete restaurant data"});
        }
    }
});

module.exports = routes;