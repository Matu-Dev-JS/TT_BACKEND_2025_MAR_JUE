import WorkspaceMember from "../models/WorkspaceMembers.model.js"

class MembersWorkspaceRepository {
    async create({ workspace_id, user_id, role }) {
        const workspace_member = new WorkspaceMember({
            workspace_id,
            user_id,
            role
        })
        await workspace_member.save()
    }
    async getAllByWorkspaceId (workspace_id){
        return await WorkspaceMember.find({workspace_id: workspace_id})
    }

    async getAllByUserId (user_id){
        const workspaces_list = await WorkspaceMember
        .find({user_id: user_id})
        .populate('workspace_id', 'name') //Expandirme los datos referenciados de la propiedad workspace_id
        //Populate solo sirve si la propiedad que intentamos expandir tiene una referencia a otra coleccion existente

        const workspaces_list_formatted = workspaces_list.map((workspace_member) => {
            return {
                _id: workspace_member._id,
                user: workspace_member.user_id,
                workspace: workspace_member.workspace_id,
                role: workspace_member.role
            }
        })
        return workspaces_list_formatted
    }

}

const members_workspace_repository = new MembersWorkspaceRepository()
export default members_workspace_repository