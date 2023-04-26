const User = require("./model");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    console.log("addUser");
    console.log(req.body);
    const newUser = await User.create(req.body);
    if (newUser.id) {
      const successResponse = {
        message: "New user added",
        user: {
          id: newUser.id,
          userName: newUser.userName,
          email: newUser.email,
        },
      };
      res.status(201).json(successResponse);
    } else {
      throw new Error("Cannot add user");
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const successResponse = {
      message: "Users listed",
      users: { users },
    };
    res.status(201).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const numberOfDeletedRecords = await User.destroy({
      where: { userName: req.body.userName },
    });
    res.status(201).json({
      message: "successfully deleted",
      result: numberOfDeletedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const fieldName = req.body.fieldName;
    const newValue = req.body.newValue;
    const result = await User.update(
      { [fieldName]: newValue },
      { where: { userName: req.body.userName } }
    );
    res.status(201).json({
      message: "successfully updated",
      result: result,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    console.log("Login start");
    if (req.authenticatedUser) {
      res.status(200).json({
        message: "Success",
        user: {
          userName: req.authenticatedUser.userName,
          email: req.authenticatedUser.email,
        },
      });
      return;
    }
    if (req.ourUser.passed) {
      console.log("user passed");
      const token = jwt.sign({ id: req.ourUser.id }, process.env.SECRET_KEY);
      res.status(200).json({
        message: "Success",
        user: {
          userName: req.ourUser.userName,
          email: req.ourUser.email,
          token: token,
        },
      });
    } else {
      res.status(501).json({
        message: "No Match",
        result: {
          result: "User data incorrect",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
  login,
};
