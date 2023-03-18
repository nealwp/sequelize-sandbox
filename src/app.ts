import * as db from './db'
import router from './router'
import { createServer } from './server'

const PORT = 3000
const server = createServer(router)

db.initialize().then(async () => {
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
})
