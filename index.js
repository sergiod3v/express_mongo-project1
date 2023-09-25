//DB
const connectDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middleware/not-found')
//Server Start
const express = require('express');
const app = express();
app.use(express.static('./public'));
app.use(express.json());

const port = 3000;
const baseURL = "/api/v1"
//Routers 
const tasksRoutes = require('./router/tasks')
//routes
app.get(baseURL, (req, res) => {
  res.send("Sergio's API 😁")
})
app.use(`${baseURL}/tasks`, tasksRoutes)
app.use(notFound)


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`DB Succesfully Connected.\nServer running in :${port}${baseURL}`))
  } catch (error) {
    console.log(error)
  }
}

start()
