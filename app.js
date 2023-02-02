const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
app.use(express.json())

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Database successfully connected!')
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Listening on port 3000')
})
