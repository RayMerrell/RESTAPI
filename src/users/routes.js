const userRouter = require("express").Router();
const {addUser,getAllUsers,deleteUser,updateUser, login} = require("./controllers");
const {hashPassword, comparePassword, tokenCheck} = require("../middleware");

userRouter.post("/users/login", comparePassword, login);
userRouter.post("/users/addUser",hashPassword, addUser);
userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers); //protected endpoint
userRouter.delete("/users/deleteUser", deleteUser);
userRouter.put("/users/updateUser", updateUser);
userRouter.get("/users/verifyUser", tokenCheck, login);

module.exports = userRouter;