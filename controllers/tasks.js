const mongoose = require('mongoose')
const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find().lean();
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(200).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  if (!mongoose.isValidObjectId(taskID)) {
    return next(createCustomError(`Task with id <${taskID}> not found`, 404))
  }

  const task = await Task.findOne({ _id: taskID }).lean();

  if (!task) {
    return next(createCustomError(`Task with id <${taskID}> not found`, 404))
  }
  res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task || task.deletedCount == 0) {
    return next(createCustomError(`Task with id <${taskID}> not found`, 404))
  } else {
    res.status(200).json({ task })
  }
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
    return next(createCustomError(`Task with id <${taskID}> not found`, 404))
  }
  res.status(200).json({ task });
})


module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
}