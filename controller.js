const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tripeModel ,accounts} = require('./models');
const mongoose = require('mongoose');
const db = require("./db");








const register = async (user) => {


  accounts.pre("save",async ()=>{
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  })

  // console.log('USER: ', user);
  // if (savedUser.length === 0) {

  //   const newUser = user;

  //   newUser.id = 2;

  //   newUser.password = await bcrypt.hash(
  //     user.password,
  //     Number(process.env.SALT)
  //   );

  //   users.push(newUser); 
  //   return newUser;
  // } else {
  //   return 'User already exists';
  // }

};
const login = async (user) => {
  const savedUser = users.filter((u) => u.email === user.email);

  if (savedUser.length === 0) {
    return 'User Not Found please register';
  } else {

    if (await bcrypt.compare(user.password, savedUser[0].password)) {

      const savedPermission = roles.filter((p) => p.id === savedUser[0].role_id);

      const payload = {
        email: savedUser[0].email,
        permissions: savedPermission[0].permissions,
      };

      const options = {
        expiresIn: process.env.TOKEN_EXPIRATION,
      };

      return await jwt.sign(payload, process.env.SECRET, options);

    } else {
      return 'Username or password not correct';
    }
  }
};

const getUsers = async () => {
  const result = await accounts.find({});
  return result;;
};
   
const addTrip = (email,place,numOfPeople,price) => {
  const newTodo = new tripeModel({
    email,
    place,
    numOfPeople,
    price
  });
  newTodo
  .save()  
   .then((result) => {
     console.log('RESULT: ', result);
   }) 
   .catch((err) => {
       console.log('ERR: ', err);
   });
};

const allTrip = async () => {
  const result = await tripeModel.find({});
  return result;
}
const putTrip = async ( newPlace, newNumPeople, newPrice) => {
  console.log(newPrice);
  const output = await tripeModel.update({ newPlace },{ newNumPeople },{ newPrice })
  return output
}
const deleteTrip = async () => {
  const deleted = await tripeModel.deleteMany({});   
}
module.exports = { 
  register,
  login,
  getUsers,
  addTrip,
  allTrip,
  putTrip,
  deleteTrip
};  