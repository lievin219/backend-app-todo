import express from 'express'
 import { get,merge } from 'lodash'
  import { getuserbySession } from '../db/users'
   export const isauthenticated=async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
     try{
     const sessionToken=req.cookies['gakiza-api']
      if(!sessionToken){
         return res.sendStatus(403)
      }
       const existinguser=await getuserbySession(sessionToken)
       if(!existinguser){
        return res.sendStatus(403)
       }
        merge(req,{identity:existinguser})
         return next()
     }
     catch(error){
     console.log(error)
     }
   }
 export const isowner=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
 const {id }= req.params
  const curentuserid= get(req, "identity._id")as string
   if(!curentuserid){
     return res.sendStatus(403)
   }
   if(curentuserid.toString() !==id){
    return  res.sendStatus(403)
   }
   next();
    }
     catch(error){
         console.log(error)
 return  res.sendStatus(400) 
     }
 }