import WorkspaceMember from "../models/WorkspaceMembers.model.js"

class MembersWorkspaceRepository {
    async create({ workspace_id, user_id, role }) {
        const workspaceMember = new WorkspaceMember({
            workspace_id,
            user_id,
            role
        })
        await WorkspaceMember.save()
    }
}
const members_workspace_repository = new MembersWorkspaceRepository()
export default members_workspace_repository