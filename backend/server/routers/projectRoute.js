const express = require('express');
const projectController = require("./../controllers/projectController");
const taskController = require("./../controllers/taskController");
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/")
    .get(protect,projectController.getAllProjects)
    .post(protect,projectController.createNewProject);

router.route("/:id")
    .get(protect,projectController.getProjectByID)
    .delete(protect,projectController.deleteProject)
    .put(protect,projectController.updateProject)

router.route("/:id/tasks")
    .get(protect,taskController.getAllTasks);

module.exports = router;