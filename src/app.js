
import { ENVIRONMENT } from "./environment.js";
import {connectDB} from './config/db.config.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
connectDB()

import express from 'express'
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";


const app = express() 
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Server is running</h1>')
})

app.get('/ping', (request, response) =>{
    response.send('<h1>Server is running</h1>')
})


//'hola mundo que tal'.split(' ')
    //['hola', 'mundo', 'que', 'tal']
    //'Que-tal?'.split('-')
    //['Que', 'tal?']
    //'user.login.4'.split('.')
    //['user', 'login', '4']
    /* 
    let header_authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aWFzIiwiZW1haWwiOiJtYXRpLmRldi5naW1lbmV6QGdtYWlsLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDI1LTA2LTAzVDIwOjU2OjQ5LjM2N1oiLCJpYXQiOjE3NDkxNDk3MzF9.TfrNmOtIFR0JwUcnmVXzSkhrvTaqw1mtvocdM18kxyA'.split(' ')
    let token_authorization = header_athorization[1]
*/

app.get('/private-info', (request, response) => {
    try{
        const authorization_header = request.headers['authorization']
        console.log(authorization_header)
        const authorization_type = authorization_header.split(' ')[0]
        const authorization_token = authorization_header.split(' ')[1]
        
        //Verificar la firma del token
        //Si el token es invalido lanzar un error "Unauthorized" 401
        //Si el token es valido responder con la clave
    
        const authorization_token_payload = jwt.verify(authorization_token, ENVIRONMENT.JWT_SECRET_KEY)
        console.log(authorization_token_payload)
        
        response.send("Clave super importante que solo un USUARIO DEBERIA PODER ACCEDER")

    }
    catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            response.status(401).send({
                ok: false,
                message: 'Token invalido',
                status: 401
            })
        }
        else{
            response.status(500).send(
                {
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                }
            )
        }
    }
})

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`La aplicacion se esta escuchando en http://localhost:${ENVIRONMENT.PORT}`)
})

class Cat {

}


const cat_1 = new Cat()
const cat_2 = {}
console.log(cat_2 instanceof Cat)