import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import postRoutes from './routes/post'

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = config
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose
  .connect(mongoURL)
  .then(() => console.log('Successfully connected to mongoDB!'))
  .catch((err) => {
    console.log(err)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello everybody good day!')
})

app.use('/api/v1/posts', postRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))