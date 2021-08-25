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

   module.exports={usernameExists}