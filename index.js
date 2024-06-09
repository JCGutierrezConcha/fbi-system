import express from 'express'
import path from "path"
import "dotenv/config"
import routerAgent from './routes/agent.route.js'

const app = express()
const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")))

app.use('/', routerAgent)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})
