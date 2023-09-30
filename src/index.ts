import { Elysia, t } from 'elysia'
import { PrismaClient } from '@prisma/client'

import { userControllerFactory } from './factories/userControllerFactory'

const setup = (app: Elysia) => {
  const db = new PrismaClient()

  const userController = userControllerFactory(db)

  return app.decorate('userController', userController)
}

const app = new Elysia()
  .use(setup)
  .group('/v1', app =>
    app
      .post('/register', async ({ userController, body, set }) => {
        const { message, code } = await userController.register(body)

        set.status = code

        return message
      },
        {
          body: t.Object({
            username: t.String(),
            password: t.String()
          })
        }
      )
  )
  .get('/', () => 'Hello Elysia')

app.listen(3000)

console.log(
  `Arithmetic calculator is running at ${app.server?.hostname}:${app.server?.port}`
)
