const express = require('express');
const taskController = require("./../controllers/taskController");

const router = express.Router();

router.route("/")
    .post(taskController.createNewTask);

router.route("/:id")
    .delete(taskController.deleteTask)
    .put(taskController.updateTask);

module.exports = router;