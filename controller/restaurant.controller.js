const Restaurant = require("../models/restaurant.model")

Restaurant.createRestaurant = async(newRestaurant)=>{
    try {
        const createRestaurant = await Restaurant.create(newRestaurant)
        console.log("create restaurant:",createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("err" ,error);
        throw err;
    }
}

module.exports = Restaurant;