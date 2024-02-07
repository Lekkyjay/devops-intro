import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import postRoutes from './routes/post'
import authRoutes from './routes/auth'
import session from 'express-session'
import { createClient } from 'redis'
import RedisStore from 'connect-redis'

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET } = config
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

// Initialize client.
const redisClient = createClient({ url: REDIS_URL })
redisClient.connect()
redisClient.on('connect', () => console.log('RedisClient is connected'))
redisClient.on('error', (err) => console.log('RedisClient error.....:', err))
redisClient.on('reconnecting', () => console.log('RedisClient is reconnecting'))
redisClient.on('ready', () => console.log('RedisClient is ready'))

// Initialize store.
let redisStore = new RedisStore({ client: redisClient })

const app = express()

app.use(session({
  store: redisStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 300000,   //5min
    sameSite: 'lax'
  }
}))

app.use(express.json())

app.get('/api/v1', (req, res) => {
  res.send('Hello everybody good day!')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/posts', postRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))