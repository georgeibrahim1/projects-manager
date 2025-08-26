const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: { user: newUser }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: { user }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};


module.exports = {
    createUser,
    getUserById
}
