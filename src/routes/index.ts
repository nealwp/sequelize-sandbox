import { Router } from 'express'
import characterRouter from './character.routes'

const router = Router()

router.use('/characters', characterRouter)

export default router