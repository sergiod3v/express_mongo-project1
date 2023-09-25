const Task = require('../models/tasks')
const getAllTasks = (req, res) => {
  res.json({ data: [] });
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getTask = (req, res) => {
  res.json({ id: req.params.id });
}

const updateTask = (req, res) => {
  res.json({ id: req.params.id });
}

const deleteTask = (req, res) => {
  res.json({ id: req.params.id });
}


module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
}