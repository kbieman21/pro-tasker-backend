const Task = require('../models/Task')
const Project = require('../models/Project')

async function getTasks(req, res){
    try {
    const userTasks = await Task.find({
      project: req.params.projectId,
      // user: req.user._id,
    });

    res.json(userTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getTaskById(req, res){
  // try {
  //   const { taskId, projectId } = req.params;

  //   const task = await Task.findById(taskId);
  //   const project = await Project.findById(projectId)

  //   if(!project){
  //     return res
  //       .status(404)
  //       .json({ message: `Project with id: ${projectId} not found!` });
  //   }

  //   if (!taskId) {
  //     return res
  //       .status(404)
  //       .json({ message: `Task with id: ${taskId} not found!` });
  //   }

    
    
  //   // Authorization
  //   console.log(req.user._id);
  //   console.log(task.project);
  //   console.log(task.project, req.project._id.toString());
    

  //   if (task.project!== req.project._id.toString()) {      
  //     return res.status(403).json({ message: "Project doesn't have this task!" });
  //   }

  //   res.json(task);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: error.message });
  // }
   try {
        // This needs an authorization check
        //get to be update task
		
		
       // const getDeleteTask = await Task.findById(req.params.taskId);
	   
	    const getTaskById = await Task.findById(req.params.taskId);
		
        if (!getTaskById) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }
		
        //find the project owner
        const projectId = getTaskById.project;
		
		
        console.log(projectId);
		
        const getProject = await Project.findById(projectId);
        if (!getProject) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
		
        // check if the user field on that task matches the authenticated user’s _id.
        if (getProject.user.toString() !== req.user._id) {
            return res
                .status(403)
                .json({ message: "Not Authorize to update this task" });
        }
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: "No task found with this id!" });
        }
        res.json({ message: "we found task!" });
    } catch (err) {
        res.status(500).json(err);
    }

}


async function updateTask(req, res){
     try {
    const task = await Task.findById(req.params.taskId);

     if (!task) {
      return res.status(404).json({ error: "Task not Found!" });
    }

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Task does not Belong to any project!" });
    }

    if (project.user.toString() === req.user._id) {
      const newTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(newTask);
    }else{
      res.status(403).json({ error: "You have no access to this task" });

    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res){
    try {
    // 1. Find the task by ID
    const taskToDelet = await Task.findById(req.params.taskId);

    if (!taskToDelet) {
      return res.status(404).json({ error: "Task not found!" });
    }

     // 2. Find the project the task belongs to
     const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Task does not belong to any project!" });
    }


    // 3. Authorization check (Does the user own the project?)
    if (req.user._id !== project.user.toString()) {
      return res
        .status(403)
        .json({ error: "User is not authorized to delete this task" });
    }

    // 4. Delete the task
    const task = await Task.findByIdAndDelete(req.params.taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createTask(req, res){
    try {
    const newTask = await Task.create({
      ...req.body,
      project: req.params.projectId,
      // user: req.user._id,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
module.exports = {getTasks, getTaskById, updateTask, deleteTask, createTask}