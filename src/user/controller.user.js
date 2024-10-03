const userServices = require("./service.user")
const jwttoken = require("jsonwebtoken")
require('dotenv').config()
const bcrypt = require('bcrypt')
// console.log(process.env.TOKEN_SECRET)


const userController = {}

userController.registerUser = async (req, res) => {

  console.log(req.body, "body")
  const { email, password, adminCode } = req.body;

  // Check if the user provided a valid admin code (assuming a hardcoded admin code)
  
  const user = await userServices.findByEmail({ email })
  console.log(user, "user")

  // Check if the user already exists
  if (user) {
    res.send({ status: false, msg: "user already exist", data: null })
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const userCreate = await userServices.registerUser({ email, password:hashedPassword, adminCode })

    if (userCreate) {
      const token = jwttoken.sign({ userId: userCreate._id, role: userCreate.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.send({ status: true, msg: "User Created Successfully", data: userCreate, token: token })
    }
  } catch (error) {
    console.log(error)
  }
}

userController.userLogin = async(req, res) => {
  const { email, password,role} = req.body
  if(role == undefined || role == ''){
    return res.send({status: false, msg: "Role is required.", data: null}) 
  }
// do matched current login password and already registered password
try {
  const userLogin = await userServices.findByEmail({email,role})
  console.log(userLogin, "user Log")

  if(!userLogin){
     return res.send({status: false, msg: "user not found", data: null})
  }

  let compare = bcrypt.compareSync(password, userLogin.password)
console.log(password, userLogin.password, "asdfghy")
  console.log(compare, "compare")

  if(compare){
      var token = jwttoken.sign({ _id: userLogin._id }, process.env.JWT_SECRET)
      return res.send({status:true ,msg:"user login successfully",data:userLogin, token: token})
  }else{
      return res.send({status:false,msg:"user not login",data:null})
  }

} catch (err) {
  console.log(err)
  return res.send({ status: false, msg: "something went wrong in loginUser", error: err })
}
}





module.exports = userController;
