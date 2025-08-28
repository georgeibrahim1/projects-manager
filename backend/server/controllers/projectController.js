const Project = require('../models/projectModel');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const createNewProject = async (req, res) => {
  try {
    const newProject = await Project.create({
      userId: req.user._id,
      title: req.body.title,
      description: req.body.description
    });

    res.status(201).json({
      status: "success",
      data: newProject
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const getProjectByID = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: project
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        title: req.body.title,
        description: req.body.description
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: project
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found"
      });
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = { 
  getAllProjects, 
  createNewProject, 
  getProjectByID, 
  updateProject, 
  deleteProject 
};