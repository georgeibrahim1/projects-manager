const express = require('express');
const userRouter = require('./routers/userRoute');
const taskRouter = require('./routers/taskRoute');
const projectRouter = require('./routers/projectRoute');
const authRouter = require('./routers/authRoute');

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/projects', projectRouter);
app.use("/api/auth", authRouter);

module.exports = app;
