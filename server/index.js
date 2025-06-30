const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require('cors');
const readmeRoutes = require("./routes/readme.routes")

dotenv.config()
const PORT = process.env.PORT || 3000

app.use(cors(
    { origin: process.env.CORS_ORIGIN },
    { credentials: true }
));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", readmeRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})