const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const Project = require("../models/Project");
const {getProjects, getProjectById, createProject, updateProject, deleteProject} = require('../controllers/projectController')

const projectRouter = express.Router();

// Protects all rotes in this router
projectRouter.use(authMiddleware);


/**
 * GET /api/projects
 */
projectRouter.get('/', getProjects);

/**
 * GET /api/projects/:projectId
 */
projectRouter.get('/:projectId', getProjectById);

/**
 * POST /api/projects
 */
projectRouter.post('/', createProject);

/**
 * PUT /api/projects/projectId
 */
projectRouter.put('/:projectId', updateProject);

/**
 * DELETE /api/projects/projectId
 */
projectRouter.delete('/:projectId', deleteProject);


module.exports = projectRouter;