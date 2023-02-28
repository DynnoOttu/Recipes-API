const {findUser, createUser, selectUserById, verifUser} = require("./../models/users")
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2')
const generateToken = require('./../helpers/generateToken')
const email = require("../middleware/email")

const UsersController = {
    registerUser: async (req,res,next)=> {
      if(!req.body.email || !req.body.password || !req.body.name){
        return res.status(404).json({status:404,message:`input data yang benar`})
      }

      let {rows:[users]} = await findUser(req.body.email)


        if(users){
        return res.status(401).json({status:401,message:`email already registered, please login`})
      }

      let id = uuidv4()
      let otp =  Math.floor(100000 + Math.random() * 900000)

      let data = {
        id,
        email: req.body.email,
        password: await argon2.hash(req.body.password),
        fullname: req.body.name,
        otp
      }
      
      let register = await createUser(data)
      
      console.log(register)
      
      if(!register){
        return res.status(401).json({status:400,message:`registration failde`})
      } 

      try{

        let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/otp/${id}/${otp}`
        let sendEmail = email(req.body.email,otp,url,req.body.name)

        if(sendEmail == 'email not send'){
          return res.status(404).json({status:404,message:`register failed, email not send`})
        }
        return res.status(201).json({status:201,message:`register successful, please check your email`})

      }catch{
        console.log("Register error :", error)
        return res.status(404).json({status:404,message:`register failed`})
      }


    },
    
    loginUser: async(req,res,next)=>{
      if(!req.body.email || !req.body.password){
        return res.status(404).json({status:404,message:`input data yang benar`})
      }

      let {rows:[users]} = await findUser(req.body.email)

      if(!users){
        return res.status(404).json({status:404,message:`login failed, email or password failed`})

      }

      let verifyPassword = await argon2.verify(users.password,req.body.password) 
      console.log("argon verify: ----", verifyPassword)

      let data = users 
      delete data.password

      let token = generateToken(data)
      
      if(verifyPassword){
        users.token = token
        delete users.password
        delete users.created_at
        delete users.otp

        if(data.verif == 0){
          return res.status(404).json({status:404,message:`login failed, please check your email for verified`})
        }

        return res.status(200).json({status:200,message:`login successful`,data:users})
        
      }
        return res.status(404).json({status:404,message:`login failed`})
    },
    otp: async (req,res,next) => {
      let userId = req.params.id
      let otpUser = req.params.code

      if(!userId || !otpUser){
        return res.status(404).json({status:404,message:`masukan otp dengan benar`})
      }
      
      let {rows:[users]} = await selectUserById(userId)
      
      if(!users){
        return res.status(404).json({status:404,message:`users not found`})
      }
      
        if(users.otp == otpUser){
          console.log(users.otp,otpUser)
          let verif = await verifUser(userId)
          if(verif){
            return res.status(201).json({status:201,message:`successfully verified`})
          } else {
            return res.status(404).json({status:404,message:`failed to verify`})
          }
        } else {
          return res.status(404).json({status:404,message:`otp failed`})
        }
    }
}


module.exports = UsersController
