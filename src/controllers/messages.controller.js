import channel_messages_service from "../services/channelMessages.service.js"

class MessagesController {
    async create(request, response){
        try{
            /* console.log('body:', request.body)
            console.log(request.workspace)
            console.log(request.user)
            console.log(request.channel)
            console.log('Se hizo el create') */
            const messages_list = await channel_messages_service.create({
                user_id: request.user.id, 
                channel_id: request.channel._id, 
                content: request.body.content
            })
            response.json({
                ok: true,
                status: 201,
                data: {
                    messages: messages_list
                },
                message: 'Mensaje creado exitosamente'
            })

        }
        catch(error){
            if(error.status){ 
                response.status(error.status).send(
                    {
                        message: error.message, 
                        ok: false
                    }
                )
                return 
            }
            else{
                console.log('Hubo un error', error)
                response.status(500).send({message: 'Error interno del servidor', ok: false})
            }
        }

    }

    async getAllByChannel(request, response){
        try{
            const {channel_id} = request.params
            const messages_list = await channel_messages_service.getAllByChannelId({channel_id: channel_id})

            response.json({
                ok: true,
                status: 200,
                message: 'Mensajes obtenidos exitosamente',
                messages: messages_list
            })
        }
        catch(error){
            if(error.status){ 
                response.status(error.status).send(
                    {
                        message: error.message, 
                        ok: false
                    }
                )
                return 
            }
            else{
                console.log('Hubo un error', error)
                response.status(500).send({message: 'Error interno del servidor', ok: false})
            }
        }
    }
}

const messages_controller = new MessagesController()
export default messages_controller