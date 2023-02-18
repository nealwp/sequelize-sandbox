import express, { Router } from 'express'
import bodyParser from 'body-parser'

const createServer = (router: Router) => {
    const server = express()

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: true}))
    server.use(router)

    return server
}

export { createServer }