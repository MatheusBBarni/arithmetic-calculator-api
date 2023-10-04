import { PrismaClient } from '@prisma/client'
import logger from '../lib/logger'
import { UserCreate, UserUpdate } from '../types/User'

export default class UserRepository {
  private db: PrismaClient

  constructor(db: PrismaClient) {
    this.db = db
  }

  async create(data: UserCreate) {
    try {
      const result = await this.db.user.create({
        data,
        select: {
          id: true,
          username: true
        }
      })

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
        select: {
          id: true,
          username: true,
          status: true,
          records: true
        },
        where: {
          id
        },
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
        select: {
          id: true,
          username: true,
          status: true,
          password: true
        },
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
      const result = await this.db.user.findMany({
        select: {
          id: true,
          username: true,
          status: true,
          records: true
        },
      })

      logger.error(`users found; size = ${result.length}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async update(id: string, data: UserUpdate) {
    try {
      const result = await this.db.user.update({
        select: {
          id: true,
          username: true,
          status: true,
        },
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
        select: {
          id: true,
          username: true,
          status: true,
          records: true
        },
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