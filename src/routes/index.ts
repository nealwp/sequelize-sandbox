import { Router } from 'express'
import characterRouter from './character.routes'
import inventoryRouter from './inventory.routes'

const router = Router()

router.use('/characters', characterRouter)
router.use('/inventory', inventoryRouter)

export default router