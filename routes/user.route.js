const express=require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const user_route=express.Router()

user_route.post("/api/register",async(req,res)=>{
 const {name,email,password,address: {street,city,state,country,zip}}=req.body

try {
 bcrypt.hash(password,4,async(err,secure_pass)=>{
  if(err){
    console.log(err);
    res.send("something went wrong in hashing")

  }else{
    const user=new UserModel({name,email,password:secure_pass,address: {street,city,state,country,zip}})

  await user.save()
  res.send("register successfull")
  }
 })
} catch (error) {
 res.send("error in register")
 console.log(error);
}



})


user_route.post("/api/login",async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            res.send("please signup first")
        }else{
            const hash_pass = user?.password
            bcrypt.compare(password, hash_pass, (err,result)=>{
                if(result){
                    const normal_token = jwt.sign({userID:user._id},"N_token")
                    res.send({msg:"login success",  normal_token})

                }else{
                    res.send("something went wrong, login again")
                }
            })
        }
       
    } catch (error) {
        res.send("error in login the user")
        console.log(error);
    }
})











module.exports={user_route}
