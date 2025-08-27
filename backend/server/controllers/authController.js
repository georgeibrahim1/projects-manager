const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser
      }
    });
    
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { name , password } = req.body;
    console.log(req.body);
    
    if (!name || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide name and password"
      });
    }

    const user = await User.findOne({ name });
    if (!user || user.password !== password) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect name or password"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      status: "success",
      token,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

