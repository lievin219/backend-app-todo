 import express from "express";

  import { deleteuserbyid, getUsers, getuserByid } from "../db/users";
import { upperCase } from "lodash";

   export const getallusers=async(req:express.Request,res:express.Response)=>{
     try{
        const users=await getUsers()
         return res.status(200).json(users) 

        
   }
  catch(error){
     console.log(error)
      return res.sendStatus(400)
  }

}

 export const deleteauser=async(req:express.Request,res:express.Response)=>{
    try{
 const {id}=req.params;
  const deleteduser=await deleteuserbyid(id)
   return res.json(deleteduser)
    }
    catch(error){
         console.log(error)
          return res.sendStatus(400)
    }
 }

  export const updateuser=async(req:express.Request,res:express.Response)=>{
    try{
       const {id}=req.params
        const {todo}=req.body
         if(!todo){
             return res.sendStatus(400)
         }
          const user= await getuserByid(id)
           user.todo=todo
             await user.save()
              return res.status(200).json(user).end()

    }
    catch(error){
        console.log(error)
         return res.sendStatus(400)

    }
  }
   