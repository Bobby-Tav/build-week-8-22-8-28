const express = require('express')
const User = require('./user-model')
const bcrypt = require('bcrypt')
const router=express.Router()

//[Get]
router.get('/', async (req, res, next) => {
     try{
        res.json(await User.getAll())
     }catch(err){
         next(err)
     }
  })

  //[POST]register
  router.post('/register',async (req,res,next)=>{
      try{
          const {username,password,role_id}=req.body
          const hash = bcrypt.hashSync(password,8)
          const newUser = await User.insertUser({username,password:hash,role_id})
        res.status(201).json(newUser)
      }catch(err){
          next(err)
      }
  })

  //[POST] Login
  router.post('/login',  async (req, res, next) => {
  try {
    const { username, password } = req.body
    // does username correspond to an existing user?
    const [user] = await User.getBy({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      console.log(user)
      console.log(req.session)
      // we have determined the username and password are legit
      // we have to start a session with this user!!!!
      req.session.user = user
      // 1- a cookie will be set on the client with a sessionId
      // 2- the sessionId will also be stored in the server (the session)
      res.json({ message: `welcome, ${username}, have a cookie` })
    } else {
      next({ status: 401, message: 'bad credentials' })
    }
  } catch (err) {
    next(err)
  }
  
})

  module.exports= router