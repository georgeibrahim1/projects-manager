const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/taskRoute');
const projectRouter = require('./routes/projectRoute');

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/projects', projectRouter);

module.exports = app;
