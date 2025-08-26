const express = require("express");
const userController = require('../controllers/userController');
const { signUp } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);

router.route('/').
    post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)

module.exports = router;
