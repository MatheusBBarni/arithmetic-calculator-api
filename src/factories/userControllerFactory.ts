import { PrismaClient } from '@prisma/client'
import UserRepository from '../repositories/UserRepository'
import UserService from '../services/UserService'
import UserController from '../controllers/UserController'

export const userControllerFactory = (db: PrismaClient) => {
  const userRepository = new UserRepository(db)
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)

  return userController
}