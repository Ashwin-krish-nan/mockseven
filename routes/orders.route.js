const express=require("express")
const {Ordermodel}=require("../models/orders.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const ObjectId = mongoose.Types.ObjectId;



const order_route=express.Router()


order_route.post("/api/orders",async(req,res)=>{
 const {	 user ,
	 restaurant,
   items: [{
     name,
     price,
     quantity
   }],
   totalPrice,
   deliveryAddress: {
     street,
     city,
     state,
     country,
     zip
   },
   status}=req.body

try {
 
    const orders=new Ordermodel({	 user ,
	 restaurant,
   items: [{
     name,
     price,
     quantity
   }],
   totalPrice,
   deliveryAddress: {
     street,
     city,
     state,
     country,
     zip
   },
   status})

  await orders.save()
  res.send("orders added successfull")
  
} catch (error) {
 res.send("error in sdding orders")
 console.log(error);
}



})

order_route.get("/api/orders/:id", async (req,res)=>{
   const id = req.params.id;
  try {
   if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'orders not found' });
    }
  const ordersById = await Ordermodel.findById(id);
    if (!ordersById) {
      return res.status(404).json({ message: 'orders not found' });
    }

    res.json(ordersById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


})


order_route.put("/api/orders/:id", async (req, res) => {
  const id = req.params.id;
  const {	 user ,
	 restaurant,
   items: [{
     name,
     price,
     quantity
   }],
   totalPrice,
   deliveryAddress: {
     street,
     city,
     state,
     country,
     zip
   },
   status} = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'orders not found' });
    }

    const orders = await Ordermodel.findByIdAndUpdate(id, {	 user ,
	 restaurant,
   items: [{
     name,
     price,
     quantity
   }],
   totalPrice,
   deliveryAddress: {
     street,
     city,
     state,
     country,
     zip
   },
   status});
    if (!orders) {
      return res.status(404).json({ message: 'orders not found' });
    }
    await orders.save();

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports={order_route}