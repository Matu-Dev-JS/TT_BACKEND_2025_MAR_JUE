import express from 'express'
import channel_controller from '../controllers/channel.controller.js'
const channelRouter = express.Router()

channelRouter.post('/:workspace_id', channel_controller.create)

export default channelRouter