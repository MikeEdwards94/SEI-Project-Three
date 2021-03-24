import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environments.js'


const app =  express()

const startServer = async () =>{

  try {

    // * connsecting to mongoDB

    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


    // * body parser 
    app.use(express.json())


    // * logger middlewear 

    app.use((req, _res, next) =>{
      console.log(`🚨 Incoming request: ${req.method} - ${req.url}`)
      next()
    })


    // * server

    app.listen(port, () => console.log(`🚀 express is up and running on port ${port}`))

  } catch (err) {
    console.log('🆘 something went wrong starting the app')
    console.log(err)
  }
}
startServer()

