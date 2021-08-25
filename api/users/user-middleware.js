const User = require('./../users/user-model')

const usernameExists = async (req, res, next) => {
    try{
     const [user] = await User.getBy({username:req.body.username})
       if(!user){
         next({status:401, message:'Invalid credentials'})
       }else{
         req.user = user
         next()
       }
     }catch(err){
       next(err)
     }
   }
   const validateUsername = async (req, res, next) => {
    try{
     const [user] = await User.getBy({username:req.body.username})
       if(user){
         next({status:401, message:'Username taken'})
       }else{
         next()
       }
     }catch(err){
       next(err)
     }
   }

   const validateInput = async (req,res,next) =>{
     const {username,password,role_id}= req.body
     if( !username || !password || !role_id){
       next({status:401,message:'missing a required field'})
     }else{
       next()
     }
   }
   module.exports={usernameExists,validateInput,validateUsername}