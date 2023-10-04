import { PrismaClient } from '@prisma/client'
import logger from '../lib/logger'
import { OperationCreate, OperationUpdate } from '../types/Operation'

export default class OperationRepository {
  private db: PrismaClient

  constructor(db: PrismaClient) {
    this.db = db
  }

  async create(data: OperationCreate) {
    try {
      const result = await this.db.operation.create({
        data,
      })

      logger.error(`operation created; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db.operation.findFirstOrThrow({
        where: {
          id
        },
      })

      logger.error(`operation found; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getAll() {
    try {
      const result = await this.db.operation.findMany()

      logger.error(`operations found; size = ${result.length}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async update(id: string, data: OperationUpdate) {
    try {
      const result = await this.db.operation.update({
        where: {
          id
        },
        data
      })

      logger.error(`operation updated; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async delete(id: string) {
    try {
      const result = await this.db.operation.delete({
        where: {
          id
        }
      })

      logger.error(`operation delete; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}