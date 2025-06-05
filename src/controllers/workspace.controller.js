import workspaces_repository from "../repositories/workspace.repository.js"

class WorkspaceController {
    async create(request, response){
        try{
            const {name, description} = request.body
            const {id} = request.user //Este id es del usuario que hace la consulta

            await workspaces_repository.create({name, description, owner_id: id})
            response.status(201).json(
                {
                    ok: true, 
                    message:'Workspace creado exitosamente',
                    status: 201,
                    data: {}
                }
            )
        }
        catch(error){
            
            if(error.status){ 
                response.status(error.status).json(
                    {
                        message: error.message, 
                        status: error.status,
                        ok: false
                    }
                )
                return 
            }
            else{
                console.log('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor', 
                        ok: false
                    }
                )
            }
        }
    }
}

const workspace_controller = new WorkspaceController
export default workspace_controller