import express from 'express'
import http from "http"
 import cors from "cors"
 import cookieParser from "cookie-parser"
  import compression from "compression"
   import bodyParser from "body-parser"
   import mongoose from 'mongoose'
   import router from './routes'
        const app=express()
        app.use(cors({
  credentials:true
        }))
        app.use(cookieParser())
         app.use(compression())
         app.use(bodyParser.json());
          const server=http.createServer(app)
           server.listen(5000,()=>{
             console.log('live server runnning on http://localhost:2000')
           })
            const mong0db_url="mongodb+srv://gakizalievin219:xArZEUuOWvxyaT8S@cluster0.0pekmzw.mongodb.net/"
             mongoose.Promise=Promise
            mongoose.connect(mong0db_url)
            mongoose.connection.on("error",(error)=>{
 console.log(error)
 
            });
            app.use("/",router())
            
           //datbase password:xArZEUuOWvxyaT8S