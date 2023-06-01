const express=require("express")
const {connection}=require("./config/db")
const {user_route}=require("./routes/user.route")
const {restaurant_route}=require("./routes/rest.route")
const {order_route}=require("./routes/orders.route")



const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
 res.send("home")
})

app.use("/",user_route)
app.use("/",restaurant_route)
app.use("/",order_route)





app.listen(8000,async()=>{
 try {
  await connection
  console.log("connected to database");
 } catch (error) {
  console.log(error);
  console.log("db not connected");
 }
 console.log("running@8000");
})