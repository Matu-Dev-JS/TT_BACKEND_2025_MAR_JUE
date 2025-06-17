
import channel_repository from "../repositories/channel.repository.js";
import workspaces_repository from "../repositories/workspace.repository.js";

class ChannelService {
    /**
     * Crea un nuevo canal en el workspace especificado.
     * 
     * @param {string} workspaceId - El id del workspace donde se creará el canal.
     * @param {string} name - El nombre del canal a crear.
     * @return {Object.channels} - Un objeto que contiene la lista actualizada de canales en el workspace.

     * 
     * @throws {Object} - Si el nombre del canal ya existe o no cumple con las validaciones.
     * @throws {Object.status} {number} - El código de estado de la respuesta (400).
     * @throws {Object.message} {string} - El mensaje de error.
     * 
     * @throws {Object} - Si el workspace no existe.
     * @throws {Object.status} {number} - El código de estado de la respuesta (404).
     * @throws {Object.message} {string} - El mensaje de error.
     */
    async create(workspaceId, name) {
        try {
            if (typeof name !== 'string' || name.length >= 12) {
                throw { status: 400, message: 'El nombre del canal debe ser un string con menos de 12 caracteres' };
            }

            // Verificar si el canal ya existe
            const existingChannel = await channel_repository.findByName(name, workspaceId);
            if (existingChannel) {
                throw { status: 400, message: 'El nombre del canal ya está en uso' };
            }
            const workspace = await workspaces_repository.getById(workspaceId);
            if (!workspace) {
                throw { status: 404, message: 'Workspace not found' };
            }

            await channel_repository.create(workspaceId, name);
            const channels = await channel_repository.getAllByWorkspace(workspaceId);
            return {
                channels
            };
        } catch (error) {
            throw error;
        }
    }
}

const channel_service = new ChannelService();
export default channel_service;