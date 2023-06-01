const express=require("express")
const {Restaurantmodel}=require("../models/restaurant.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const ObjectId = mongoose.Types.ObjectId;



const restaurant_route=express.Router()



restaurant_route.post("/api/restaurants",async(req,res)=>{
 const {name,address: {
    street,
    city,
    state,
    country,
    zip
  },
  menu: [{
    dname,
    description,
    price,
    image,
  }]}=req.body

try {
 
    const restaurant=new Restaurantmodel({name,address: {
    street,
    city,
    state,
    country,
    zip
  },
  menu: [{
    dname,
    description,
    price,
    image,
  }]})

  await restaurant.save()
  res.send("restaurant added successfull")
  
} catch (error) {
 res.send("error in register")
 console.log(error);
}



})



restaurant_route.get("/api/restaurants",async (req,res)=>{
 try {
  const restaurants = await Restaurantmodel.find({})
  if(!restaurants){
   res.send("No restaurants available")
  }else{
   res.send(restaurants)
  }
 } catch (error) {
  res.send("error in fetching restaurants")
        console.log(error);
 }
})

restaurant_route.get("/api/restaurants/:id", async (req,res)=>{
   const id = req.params.id;
  try {
   if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'restaurant not found' });
    }
  const restaurantById = await Restaurantmodel.findById(id);
    if (!restaurantById) {
      return res.status(404).json({ message: 'restaurant not found' });
    }

    res.json(restaurantById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


})



restaurant_route.get("/api/restaurants/:id/menu", async (req,res)=>{
   const id = req.params.id;
  try {
   if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'restaurant not found' });
    }
  const restaurantById = await Restaurantmodel.findById(id);
    if (!restaurantById) {
      return res.status(404).json({ message: 'restaurant not found' });
    }

    res.json(restaurantById.menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


})


restaurant_route.put("/api/restaurants/:id/menu", async (req, res) => {
  const id = req.params.id;
  const newMenu = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const restaurant = await Restaurantmodel.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.menu = newMenu;

    // Save the updated restaurant document
    await restaurant.save();

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports={restaurant_route}