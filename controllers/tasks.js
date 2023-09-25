const mongoose = require('mongoose')
const Task = require('../models/tasks')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().lean();
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // Validate the taskId parameter
    if (!mongoose.isValidObjectId(taskID)) {
      return res.status(400).json({ error: 'Invalid task ID.' });
    }

    // Find the task document
    const task = await Task.findOne({ _id: taskID }).lean();

    // Handle the case where the task does not exist
    if (!task) {
      return res.status(404).json({ error: `Task with id <${taskID}> does not exist.` });
    }

    // Return the task document
    res.status(200).json({ task });
  } catch (error) {
    // Log the error
    console.error(error);

    // Return a generic error response
    res.status(500).json({ msg: 'An error occurred while fetching the task.' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task || task.deletedCount == 0) {
      return res.status(404).json({ error: `Task with id <${taskID}> does not exist.` })
    } else {
      res.status(200).json({ task })
    }
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    })
    if (!task) {
      return res.status(404).json({ error: `Task with id <${taskID}> does not exist.` })
    }
    res.status(200).json({ task });
  } catch (error) {

  }
}


module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
}