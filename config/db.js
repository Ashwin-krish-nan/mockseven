const express=require("express")
const mongoose=require("mongoose")


const connection =mongoose.connect("mongodb+srv://ashwin:kavitha@cluster0.1gh28os.mongodb.net/mockseven?retryWrites=true&w=majority")



module.exports={connection}