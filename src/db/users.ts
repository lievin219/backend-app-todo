import mongoose from "mongoose";

 const usersschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
   todo:{
    type:String,
    required:true
   },
   done:{
     type:Boolean,
     required:true
   },
    email:{
         type:String,
         required:true,

    },
    
    authentication:{
        password:{
            type:String,
        required:true,
        select:false
        },
        salt:{
            type:String,
            required:true,
            select:false


        },
        sessionToken:{
type:String,
 select:false
        }

        }
    }
 )
  export const usermodel=mongoose.model('User',usersschema)
   export const getUsers=()=>usermodel.find()
    export const getuserByEmail=(email:string)=>usermodel.findOne({email})
     export const getuserbySession=(sessionToken:string)=>usermodel.findOne({
        'authentication.sessionToken':sessionToken
     })
      export const getuserByid=(id:string)=>usermodel.findById(id)
       export const createUser=(values:Record<string,any>)=>new usermodel(values).save().then((user)=>
        user.toObject())
   export const deleteuserbyid=(id:string)=>usermodel.findOneAndDelete({_id:id});
    export const updateuserbyid=(id:string,values:Record<string,any>)=>usermodel.findOneAndUpdate({id, values}) 
