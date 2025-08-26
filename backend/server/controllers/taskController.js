const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: { tasks }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const createNewTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      projectId: req.body.projectId,
      title: req.body.title,
      status: req.body.status
    });

    res.status(201).json({
      status: "success",
      data: { newTask }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const getTaskByID = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("projectId");

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: { task }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: { task }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found"
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

module.exports = { getAllTasks, createNewTask, getTaskByID, updateTask, deleteTask };
