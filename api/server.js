const express = require('express')

//Router
const userRouter = require('./users/user-router')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users',userRouter)

server.use((err,req,res,next)=>{
  res.status(err.status || 500).json({message: err.message})
})

module.exports = server
