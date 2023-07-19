const routes = require("../routes/restaurant.routes")
const sql = require("./db.sql");
//constructor
const Restaurant = function (restaurant) {
        
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.image = restaurant.image;
};

//mathod
Restaurant.create =(newRestaurant, result) => {
    //INSERT INTO  restaurant SET name,type,image VALUES("KFC","FASTFOOD","url")
    sql.query ("INSERT INTO  restaurants SET ?",newRestaurant , (err, res)=>{
        //มีerror เกิดขึ้น
        if (err) {
            
        
        console.log("error", err);
        result(err , null);
        return;
        }else
        console.log("new restaurant created");
    result(null,{id:res.id,...newRestaurant})
    });
}

Restaurant.getAll = (result) => {
    //SELECT * FROM restaurants
    sql.query("SELECT * FROM restaurants", (err, res)=>{
        if (err) {
            console.log("error", err);
            result(err,null);
            return
        }
        console.log("get all restaurants");
        result(null, res);
    })
}

//et id
Restaurant.getById = (restaurantId, result) => {
    // SELECT * FROM restaurants WHERE id = restaurantId
    sql.query("SELECT * FROM restaurants WHERE id = ?", [restaurantId], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
            return;
        }

        if (res.length === 0) {
            // Restaurant with the given ID was not found
            result({
                message: "Restaurant not found [ID]"
            }, null);
            return;
        }

        // No error occurred, and restaurant was found
        console.log("Restaurant found");
        result(null, res[0]);
    });
};

// Update
Restaurant.updateById = (restaurantId, updatedData, result) => {
    // UPDATE restaurants SET ... WHERE id = restaurantId
    sql.query("UPDATE restaurants SET ? WHERE id = ?", [updatedData, restaurantId], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
            return;
        }
        // No error occurred
        console.log("Restaurant updated");
        result(null, res);
    });
};

// Delete
Restaurant.deleteById = (restaurantId, result) => {
    // DELETE FROM restaurants WHERE id = restaurantId
    sql.query("DELETE FROM restaurants WHERE id = ?", [restaurantId], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
            return;
        }
        // No error occurred
        console.log("Restaurant deleted");
        result(null, res);
    });
};


Restaurant.updateById= (id,restaurant,result)=>{
    sql.query(
        "UPDATE restaurants SET name = ?, type=? image=? WHERE = ?"
    )
}


module.exports =  Restaurant;