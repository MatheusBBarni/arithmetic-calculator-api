import { Prisma, PrismaClient } from '@prisma/client'
import logger from '../lib/logger'

export default class UserRepository {
  private db: PrismaClient

  constructor(db: PrismaClient) {
    this.db = db
  }

  async create(data: Prisma.UserCreateInput) {
    try {
      const result = await this.db.user.create({ data })

      logger.error(`user created; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db.user.findFirstOrThrow({
        where: {
          id
        }
      })

      logger.error(`user found; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getByUsername(username: string) {
    try {
      const result = await this.db.user.findFirstOrThrow({
        where: {
          username
        }
      })

      logger.error(`user found; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getAll() {
    try {
      const result = await this.db.user.findMany()

      logger.error(`users found; size = ${result.length}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    try {
      const result = await this.db.user.update({
        where: {
          id
        },
        data
      })

      logger.error(`user updated; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async delete(id: string) {
    try {
      const result = await this.db.user.delete({
        where: {
          id
        }
      })

      logger.error(`user delete; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}