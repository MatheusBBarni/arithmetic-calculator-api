import { PrismaClient } from '@prisma/client'

import logger from '../lib/logger'
import { RecordCreate, RecordUpdate } from '../types/Record'

export default class RecordRepository {
  private db: PrismaClient

  constructor(db: PrismaClient) {
    this.db = db
  }

  async create(data: RecordCreate) {
    try {
      const result = await this.db.record.create({
        data,
      })

      logger.error(`record created; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db.record.findFirstOrThrow({
        where: {
          id
        },
      })

      logger.error(`record found; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async getAll() {
    try {
      const result = await this.db.record.findMany()

      logger.error(`records found; size = ${result.length}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async update(id: string, data: RecordUpdate) {
    try {
      const result = await this.db.record.update({
        where: {
          id
        },
        data
      })

      logger.error(`record updated; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  async delete(id: string) {
    try {
      const result = await this.db.record.delete({
        where: {
          id
        }
      })

      logger.error(`record delete; id = ${result.id}`)

      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}