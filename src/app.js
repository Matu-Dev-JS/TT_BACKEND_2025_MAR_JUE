
import { ENVIRONMENT } from "./environment.js";
import {connectDB} from './config/db.config.js'
import cors from 'cors'

connectDB()

import express from 'express'
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";


const app = express() 
app.use(cors())
app.use(express.json())


app.get('/ping', (request, response) =>{
    response.send('<h1>Server is running</h1>')
})

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`La aplicacion se esta escuchando en http://localhost:${ENVIRONMENT.PORT}`)
})
