import express from 'express'
import {connectDB} from './db/db.js'
import {Note} from './models/note.model.js'
import cors from 'cors'

const app = express()
app.use(cors())
const database = connectDB()

const port = 3000

app.get('/', (req, res) => {
  Note.find()
  .then( notes =>{
    res.send(notes)
  }
  )
  .catch(err => res.send(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})