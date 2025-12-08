const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const Task = require("../models/Task");
const Project = require("../models/Project");
const {getTasks, updateTask, deleteTask, createTask} = require('../controllers/taskController')

const taskRouter = express.Router();

// Protects all rotes in this router
taskRouter.use(authMiddleware);

/**
 * GET /api/projects/:projectId/tasks
 */
taskRouter.get('/:projectId/tasks', getTasks);

/**
 * POST /api/projects/:projectId/tasks
 */
taskRouter.post('/:projectId/tasks', createTask);

/**
 * PUT /api/projects/projectId/tasks/:taskId
 */
taskRouter.put('/:projectId/tasks/:taskId' ,updateTask)

/**
 * DELETE /api/projects/projectId/tasks/:taskId
 */
taskRouter.delete('/:projectId/tasks/:taskId', deleteTask);

module.exports = taskRouter;
