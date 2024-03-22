import express, { Router } from "express";
 import { deleteauser, getallusers, updateuser} from "../controller/users";
 import { isowner,isauthenticated} from "../middlewares";
  export default (router:express.Router)=>{
     router.get('/users',getallusers)
      router.delete('/users/:id',deleteauser) 
       router.patch('/users/:id',updateuser)
        
  }
  