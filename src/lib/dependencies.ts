import Elysia from 'elysia'
import { PrismaClient } from '@prisma/client'

import UserRepository from '../repositories/UserRepository'
import UserService from '../services/UserService'
import UserController from '../controllers/UserController'

const dependencies = (app: Elysia) => {
  const db = new PrismaClient()

  const userRepository = new UserRepository(db)

  const userService = new UserService(userRepository)

  const userController = new UserController(userService)

  return app.decorate('userController', userController)
}

export default dependencies