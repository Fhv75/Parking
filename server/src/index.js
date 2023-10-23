const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const userRouter = require('./routes/userRoutes')
const vehicleRouter = require('./routes/vehicleRoutes')

const app = express()

dotenv.config({ path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT || 5000

const frontendURL = 'http://localhost:5173'

app.use(cors({ origin: frontendURL }))
app.use(express.json())
app.use(userRouter, vehicleRouter)

app.listen(PORT, () => {
    console.log('app running on port ' + PORT)
})