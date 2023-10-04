import { $Enums } from '@prisma/client'

import OperationService from '../services/OperationService'
import { ControllerResult } from '../types/Api'
import { OperationCreate } from '../types/Operation'

export default class OperationController {
  private operationService: OperationService

  constructor(operationService: OperationService) {
    this.operationService = operationService
  }

  async create(userId: string, data: String, operationType: $Enums.OperationType): Promise<ControllerResult> {
    const result = await this.operationService.createOperation(userId, data.trim(), operationType)

    if (!result) {
      return {
        data: 'Something went wrong',
        code: 403
      }
    }

    return {
      data: result,
      code: 201
    }
  }
}