import express from 'express'
import bodyParser, { json } from 'body-parser'
import router from './routes'

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(router)

export default server