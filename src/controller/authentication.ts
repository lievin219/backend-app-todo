  // i tried here to import frame works to be used !!
 
 import express from "express"
 import { createUser, getuserByEmail } from "../db/users"
 import { random, authentication} from "../helpers"


    //here its the  asynchronoumous function allowing user to login 
  export const login=async(req:express.Request,res:express.Response)=>{
     try{
 const {email,password}=req.body
 if(!email||!password){
     return res.sendStatus(400)
 }
  const user=await getuserByEmail(email).select('+authentication.salt +authentication.password') 
   if(!user){
    return res.sendStatus(400)
   }
    const expectedhash=authentication(user.authentication.salt,password)
     if(user.authentication.password!==expectedhash){
         return res.sendStatus(403)
     }
      const salt=random()
       user.authentication.sessionToken=authentication(salt,user._id.toString())
       await user.save()
      
       res.cookie("gakiza-auth",user.authentication.sessionToken,{domain:"localhost",path:"/"})
       return res.status(200).json(user).end()
     }
     catch(error){
         console.log(error)
        return res.sendStatus(400)

     }
  }

  //here its the  asynchronoumous function allowing user to  register

  export  const register=async(req:express.Request,res:express.Response)=>{
     try{
         const {email,password,username,todo,done}=req.body
          if(!email || !password || !username){
  return res.sendStatus(400)
          }
          

          //here if a user already exists via email  there will be a message of a  forbidden
          const existinguser= await getuserByEmail(email)
          if(existinguser){
            return res.sendStatus(400)
          }
          const salt=random()
          const user=await createUser({
            email,
            username,
            todo,
            done,
         
            authentication:{
                salt,
                password:authentication(salt,password) 
            }
          })
          return res.status(200).json(user).end()
        // this upward return describe that  if ser does not exist he?she wil be  regiistered
     }
     catch(error){
          console.log(error)
          res.sendStatus(400)
     }
  }
