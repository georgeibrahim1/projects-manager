const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  title: {
    type: String,
    required: [true, "A task must have a title"],
  },
  status: {
    type: String,
    enum: ["ToDo", "InProgress", "Done"],
    default: "ToDo"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;