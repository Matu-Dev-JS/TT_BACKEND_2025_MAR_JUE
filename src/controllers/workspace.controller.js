import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js"
import members_workspace_repository from "../repositories/membersWorkspace.repository.js"
import workspaces_repository from "../repositories/workspace.repository.js"

//Garbarage storage?
//No necesitamos manipular la memoria, JS lo hace por nosotros
//Una variable se asigna automaticamente un lugar en la memoria
//Una variable no se usa automaticamente JS tambien le retira su lugar en memoria

class WorkspaceController {
    async create(request, response){
        try{
            const {name, description} = request.body
            const {id} = request.user //Este id es del usuario que hace la consulta

            const workspace_created = await workspaces_repository.create({name, description, owner_id: id})
            await members_workspace_repository.create({
                workspace_id: workspace_created._id,
                user_id: id,
                role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN
            })
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
    async delete(request, response) {
        try {
            const workspace_id = request.params.workspace_id
            const user_id = request.user.id
            await workspaces_repository.deleteWorkspaceFromOwner(user_id, workspace_id)

            response.status(200).json(
                {
                    ok: true,
                    message: 'Workspace eliminado correctamente',
                    status: 200,
                    data: {}
                }
            )
            return
        } catch (error) {

            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            } else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        };
    }

    async getAllByMember (request, response){
        const {id} = request.user
        //Obtener la lista de workspaces que el cliente es miembro
        const workspaces = await members_workspace_repository.getAllByUserId(id)
        response.json({
            ok: true, 
            status: 200,
            message:'Lista de workspaces',
            data: {
                workspaces: workspaces
            }
        })
    }
}

const workspace_controller = new WorkspaceController
export default workspace_controller

//GET ALL WORKSPACE: Obtener la lista de workspaces a los que un usuario pertenece
//Que usuario pertenezca  un workspace es cuando: es owner o es un member