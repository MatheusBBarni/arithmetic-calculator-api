import Elysia from 'elysia'
import { PrismaClient } from '@prisma/client'

import UserRepository from '../repositories/UserRepository'
import UserService from '../services/UserService'
import UserController from '../controllers/UserController'

import OperationRepository from '../repositories/OperationRepository'
import OperationService from '../services/OperationService'
import OperationController from '../controllers/OperationController'
import RecordRepository from '../repositories/RecordRepository'
import RecordService from '../services/RecordService'

const dependencies = (app: Elysia) => {
  // Database
  const db = new PrismaClient()

  // Repositories
  const userRepository = new UserRepository(db)
  const recordRepository = new RecordRepository(db)
  const operationRepository = new OperationRepository(db)

  // Services
  const userService = new UserService(userRepository)
  const recordService = new RecordService(recordRepository)
  const operationService = new OperationService(operationRepository, recordService)

  // Controllers
  const userController = new UserController(userService)
  const operationController = new OperationController(operationService)

  return app
    .decorate('userController', userController)
    .decorate('operationController', operationController)
}

export default dependencies