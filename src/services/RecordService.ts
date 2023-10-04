import RecordRepository from '../repositories/RecordRepository'
import { RecordCreate } from '../types/Record'

export default class RecordService {
  private recordRepository: RecordRepository

  constructor(recordRepository: RecordRepository) {
    this.recordRepository = recordRepository
  }

  async createRecord(data: RecordCreate) {
    return await this.recordRepository.create(data)
  }
}