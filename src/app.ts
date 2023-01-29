import * as db from './db'
import server from './server'

const PORT = 3000

db.initialize().then(async () => {
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
})
