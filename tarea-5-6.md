Crear un workspace
POST '/api/workspaces'

Obtener la lista de workspaces de un usuario
GET '/api/workspaces'

Eliminar un workspace por id (SOLO VALIDO SI EL USUARIO QUE HACE LA CONSULTA ES EL DUEÑO DEL WORKSPACE)
DELETE '/api/workspaces/:workspace_id'

Ideas para poder eliminar el workspace:
- Workspace.deleteOne({_id: })
- Workspace.findByIdAndDelete(id)

