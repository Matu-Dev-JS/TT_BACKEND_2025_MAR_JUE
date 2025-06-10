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
}

const members_workspace_repository = new MembersWorkspaceRepository()
export default members_workspace_repository