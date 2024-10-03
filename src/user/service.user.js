const User = require('./models.user');


const userServices = {};

userServices.registerUser = async ({email, password, adminCode}) =>{
    // const hash = bcrypt.hashSync(password, 10)

    let role = "admin"
    // const VALID_ADMIN_CODE = 'ADMIN1234'; // This should be stored securely
    //     if (adminCode === VALID_ADMIN_CODE) {
    //         role = 'admin';
    //     }
    let newUser = await User.create({email, password, role: role})
    return newUser
}


userServices.findByEmail = async (email,role) => {
    return  await User.findOne(email,role)
}

//user login
userServices.userLogin = async (email, password, adminCode) => {
    try {
      let user = await User.findOne(email);
      if (user) {
        let { password: hash } = user;
        let isMatched = bcrypt.compareSync(password, hash);
        if (isMatched) {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };


module.exports = userServices


