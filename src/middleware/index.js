const { json } = require("sequelize");
const User = require("../users/model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = process.env.SALT_ROUNDS;

const hashPassword = async (req, res, next) => {
  console.log("hash");
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(saltRounds)
    );
    console.log("Hashed!");
    next();
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const comparePassword = async (req, res, next) => {
  try {
    req.ourUser = await User.findOne({
      where: { userName: req.body.userName },
    });
    if (!req.ourUser){
      throw new Error("Credentials Incorrect");
    }
    //use compare
    req.ourUser.passed = await bcrypt.compare(req.body.password, req.ourUser.password);
    next();
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};
const tokenCheck = async (req, res, next)=>{
  try {
    if (!req.header("Authorization")){
      throw new Error("Missing Credentials");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token", token);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("DecodedToken", decodedToken);
    const user = await User.findOne({where: {id:decodedToken.id}});
    console.log("User", user);
    if (!user){
      throw new Error("No authorization");
    }
    req.authenticatedUser = user;
    console.log("Next Function", next);
    next();
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
    
  }
}
module.exports = {
  hashPassword,
  comparePassword,
  tokenCheck
};
