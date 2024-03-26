import bcrypt from "bcrypt"
import { users } from "../Models/Signup.model.js";
import jwt from "jsonwebtoken"

const isString = (value) =>{
    if(value === undefined || value.length === 0){
        return true;
    }else{
        return false;
    }
}


export const signUp = async(req,res) =>{
    try {
        const {name,email,password} = req.body;
         if(isString(name) || isString(email) || isString(password)){
            return res.json({err:"Bad parameters. Something is missing"})
         }  

   const salt = 10;
   bcrypt.hash(password,salt, async(err,hash)=>{
      if(err) return res.json(err)
      else {
       await users.create({email,name,password:hash})
       res.json({msg:"Successfully Register"})
    }
   })
    } catch (error) {
        res.json(error)
    }
}

const generateAccessToken = (id,name) =>{
    return jwt.sign({userId : id , name},"privateKey");
}

export const Login = async(req,res) =>{
 try {
    const{email,password} = req.body;
   if(isString(email) || isString(password)) return res.json("Somthing is missing")

    const user = await users.findAll({where:{email}})
    if(user){
        bcrypt.compare(password,user[0].password,(err,result)=>{
           if(err){
            throw new Error("something went wrong")
           }else if(result){
            return res.json({success:true,message:"you login successful",token:generateAccessToken(user[0].id,user[0].name),name:user[0].name})
           }
        })
    }else{
       return res.json("Email not Exist")
    }
 } catch (error) {
    res.json(error)
 }
}