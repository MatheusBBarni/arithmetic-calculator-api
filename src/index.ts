import { Elysia, t } from 'elysia'

import dependencies from './lib/dependencies'
import { $Enums } from '@prisma/client'

const app = new Elysia()
  .use(dependencies)
  .group('/v1', app => {
    return app
      .group('/user', app => {
        return app
          .post('/register', async ({ userController, body, set }) => {
            const { data, code } = await userController.register(body)

            set.status = code

            return { data }
          }, {
            body: t.Object({
              username: t.String(),
              password: t.String()
            })
          })
          .post('/sign-in', async ({ userController, body, set }) => {
            const { username, password } = body
            const { data, code } = await userController.signIn(username, password)

            set.status = code

            return { data }
          }, {
            body: t.Object({
              username: t.String(),
              password: t.String()
            })
          })
          .post('/sign-out', async ({ userController, body, set }) => {
            const { userId } = body
            const { data, code } = await userController.signOut(userId)

            set.status = code

            return { data }
          }, {
            body: t.Object({
              userId: t.String()
            })
          })
      })
      .group('/operation', app => {
        return app
          .post('/type/:operationType', async ({ params, operationController, body, set }) => {
            const { operation, userId } = body
            const { operationType } = params

            const { code, data } = await operationController.create(userId, operation, operationType)

            set.status = code

            return { data }
          }, {
            body: t.Object({
              userId: t.String(),
              operation: t.String(),
            }),
            params: t.Object({
              operationType: t.Enum($Enums.OperationType),
            })
          })
      })
  })

app.listen(3000)

console.log(
  `Arithmetic calculator is running at ${app.server?.hostname}:${app.server?.port}`
)
