const express = require('express');
const projectController = require("./../controllers/projectController");

const router = express.Router();

router.route("/")
    .get(projectController.getAllProjects)
    .post(projectController.createNewProject);

router.route("/:id")
    .get(projectController.getProjectByID)
    .delete(projectController.deleteProject)
    .patch(projectController.updateProject);

module.exports = router;