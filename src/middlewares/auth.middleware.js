import jwt from 'jsonwebtoken'
import { ENVIRONMENT } from '../environment.js'


//Middleware
//Que es un middleware? Si, los hemos usado antes, por ejemplo cuando: app.use(express.json())
//Middleware es una funcion que se ejecuta entre medio de un proceso
//Entre la consulta y la respuesta quiero checkear si la consulta es de tipo json y de asi guardar en el body el json de la consulta
//Entre la consulta y la respuesta quiero hacer un hola mundo por consola
//Entre la consulta y la respuesta quiero checkear si un token pasado por header es valido

const authorizationMiddleware = (request, response, next) => {
    try {
        const authorization_header = request.headers['authorization']
        const authorization_type = authorization_header.split(' ')[0]
        const authorization_token = authorization_header.split(' ')[1]
        const authorization_token_payload = jwt.verify(authorization_token, ENVIRONMENT.JWT_SECRET_KEY)
        //Se suelen guardar los datos de sesion dentro de request.user o request.session
        request.user = authorization_token_payload
        next()
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            response.status(401).send({
                ok: false,
                message: 'Token invalido',
                status: 401
            })
        }
        else {
            response.status(500).send(
                {
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                }
            )
        }
    }
}

export default authorizationMiddleware