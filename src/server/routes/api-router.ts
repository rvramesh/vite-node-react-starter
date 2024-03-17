import helloWorldRouter from '@server/api/hello-world'
import express from 'express'

const apiRouter = express.Router()

apiRouter.use('/helloworld', helloWorldRouter)
export default apiRouter
