const express = require('express');
const taskController = require("./../controllers/taskController");

const router = express.Router();

router.route("/")
    .get(taskController.getAllTasks)
    .post(taskController.createNewTask);

router.route("/:id")
    .get(taskController.getTaskByID)
    .delete(taskController.deleteTask)
    .patch(taskController.updateTask);

module.exports = router;