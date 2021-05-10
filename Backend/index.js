import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environments.js'
import router from './config/router.js'

import path from 'path'
const __dirname = path.resolve()

const app =  express()

const startServer = async () =>{

  try {

    // * connecting to mongoDB

    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

    // * body parser 

    app.use(express.static(`${__dirname}/../client/build`))

    app.use(express.json())


    
    // * logger middlewear 

    app.use((req, _res, next) =>{
      console.log(`🚨 Incoming request: ${req.method} - ${req.url}`)
      next()
    })

    app.use('/api', router)

    app.use('/*', (_, res) => res.sendFile(`${__dirname}/../client/build/index.html`))

    // * server

    app.listen(port, () => console.log(`🚀 express is up and running on port ${port}`))

  } catch (err) {
    console.log('🆘 something went wrong starting the app')
    console.log(err)
  }
}
startServer()

