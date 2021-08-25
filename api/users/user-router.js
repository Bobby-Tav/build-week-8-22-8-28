const express = require('express')
const User = require('./user-model')
const bcrypt = require('bcrypt')
const{JWT_SECRET}= require('./../../secret')
const {usernameExists,validateInput,validateUsername}=require('./user-middleware')
const jwt =require('jsonwebtoken')
const router=express.Router()

function tokenBuilder(user){
    const payload={
      subject:user.tokenBuilder,
      username:user.username
    }
    const options = {
      expiresIn: '1d'
    }
    return jwt.sign(payload,JWT_SECRET,options)
  }

  module.exports= router

 //[Get]
router.get('/', async (req, res, next) => {
     try{
        res.json(await User.getAll())
     }catch(err){
         next(err)
     }
  })

  //[POST]Register
  router.post('/register',validateInput,validateUsername,async (req,res,next)=>{
      try{
          const {username,password,role_id} = req.body
          const hash = bcrypt.hashSync(password,8)
          const newUser = await User.insertUser({username,password:hash,role_id})
        res.status(201).json(newUser)
      }catch(err){
          next(err)
      }
  })

  //[POST] Login
  router.post('/login',usernameExists, async (req, res, next) => {
    try{
        if (bcrypt.compareSync(req.body.password,req.user.password)){
          const token = tokenBuilder(req.user)
          res.json({
            message: `welcome,${req.user.username}`,
          })
          console.log('works')
        }else{
          next({status:401, message:'Invalid credentials'}) 
          console.log('no works')
        }
       }catch(err){
        next(err)
       }
    });
