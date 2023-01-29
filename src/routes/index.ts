import { Router } from 'express'
import characterRouter from './character.routes'
import inventoryRouter from './inventory.routes'
import weaponRouter from './weapon.routes'

const router = Router()

router.use('/characters', characterRouter)
router.use('/inventory', inventoryRouter)
router.use('/weapons', weaponRouter)

export default router