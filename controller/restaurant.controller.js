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

Restaurant.getAll = async () => {
    try {
        const restaurants = await Restaurant.findAll();

        return restaurants.map(restaurant => restaurant.toJSON());
    } catch (error) {
        console.error("error:",error);
        throw error;
        
    }
}

Restaurant.getById = async (restaurantId) => {
    try {
        const restaurants = await Restaurant.findByPk(restaurantId);
        if (restaurants) {
            console.log(restaurants);
            return restaurants.toJSON();
        } else {
            throw {kind: "not found"};
            
        }
    } catch (error) {
        console.error("error:",error);
        throw error;
        
    }
}

Restaurant.updateById = async (id, restaurantData) => {
    try {
        const [rowUpdated] = await Restaurant.update(restaurantData, {
            where: { id },
        });
        if (rowUpdated === 0) {
            throw {kind: " not_found"} ;
        }
        return { id: id, ...restaurantData};
    } catch (error) {
        console.log("error:" ,error);
        throw error;
    }
};

Restaurant.removeById = async(id) => {
    try {
        const rowDelete = await Restaurant.destroy({where: { id } });
        if (rowDelete === 0 ) {
            throw {kind: "not found"};
        }
        return ture
    } catch (error) {
        console.log("error:", error);
        throw error;
    }
};

module.exports = Restaurant;