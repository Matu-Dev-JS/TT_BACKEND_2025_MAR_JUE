import Workspaces from "../models/Workspace.model.js";
class WorkspacesRepository {

    
    /**
     * Crea un nuevo workspace en la base de datos.
     * 
     * @param {Object} data - Un objeto con los datos del workspace a crear.
     * @param {string} data.name - El nombre del workspace.
     * @param {string} data.owner_id - El id del usuario propietario del workspace.
     * @param {string} [data.description] - La descripcion del workspace.
     */
    async create({ name, owner_id, description}) {
   
        const workspace = new Workspaces({
            name,
            owner_id,
            description
        });
        
        await workspace.save();
        return workspace

    }
    async deleteWorkspaceFromOwner (owner_id, workspace_id) {

        //Aca eliminamos el workspace solo si el owner_id es el recibido por parametro
        const result = await Workspaces.findOneAndDelete({owner_id, _id: workspace_id})
        //Si el result es null, significa que no se elimino el workspace
        if(!result){
            throw {status: 404, message: 'El workspace a eliminar no existe'}
        }
    }
    async deleteById(workspace_id){
        return await Workspaces.findOneAndDelete({_id: workspace_id})
    }

    async getById (workspace_id){
        return await Workspaces.findById(workspace_id)
    }
}
const workspaces_repository = new WorkspacesRepository();
export default workspaces_repository;