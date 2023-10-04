import { $Enums } from '@prisma/client';

import OperationRepository from '../repositories/OperationRepository'
import RecordService from './RecordService'

type OperationType = $Enums.OperationType

type OperationArguments =
  | { type: 'random_string' }
  | { type: 'square_root'; first: number }
  | { type: 'addition'; first: number; second: number }
  | { type: 'addition'; first: number; second: number }
  | { type: 'division'; first: number; second: number }
  | { type: 'subtraction'; first: number; second: number }
  | { type: 'multiplication'; first: number; second: number }

export default class OperationService {
  private initialAmount: number = 2000

  private operationRepository: OperationRepository
  private recordService: RecordService

  constructor(operationRepository: OperationRepository, recordService: RecordService) {
    this.recordService = recordService
    this.operationRepository = operationRepository
  }

  // CreateOperationDto
  async createOperation(userId: string, data: String, operationType: OperationType) {
    const operationArgument = this.createOperationArguments(data, operationType)
    if (!operationArgument) {
      return null
    }

    const cost = this.calculateCost(operationArgument)

    const operation = await this.operationRepository.create({
      cost,
      type: operationType,
    })

    if (!operation) {
      return null
    }

    const result = await this.calculateResult(operationArgument)

    const record = await this.recordService.createRecord({
      amount: this.initialAmount,
      operation_response: String(result),
      user_balance: 0,
      User: {
        connect: {
          id: userId
        }
      },
      Operation: {
        connect: {
          id: operation.id
        }
      }
    })

    return null
  }

  private async calculateResult(argument: OperationArguments): Promise<number | string | null> {
    if (argument.type === 'division') {
      const { first, second } = argument
      return first / second
    }
    if (argument.type === 'addition') {
      const { first, second } = argument
      return first + second
    }
    if (argument.type === 'subtraction') {
      const { first, second } = argument
      return first - second
    }
    if (argument.type === 'multiplication') {
      const { first, second } = argument
      return first * second
    }
    if (argument.type === 'square_root') {
      const { first } = argument
      return Math.sqrt(first)
    }
    if (argument.type === 'random_string') {
      // return { type: operationType }
    }

    return null
  }

  private calculateCost(argument: OperationArguments): number {
    const fixedCost = 20
    switch (argument.type) {
      case 'division':
      case 'addition':
      case 'subtraction':
      case 'multiplication':
        return (argument.first + argument.second) + fixedCost

      case 'square_root':
        return argument.first + fixedCost

      case 'random_string':
      default:
        return fixedCost
    }
  }

  private createOperationArguments(data: String, operationType: OperationType): OperationArguments | null {
    if (operationType === 'division') {
      const [first, second] = data.split('/')
      return { type: operationType, first: Number(first), second: Number(second) }
    }
    if (operationType === 'addition') {
      const [first, second] = data.split('+')
      return { type: operationType, first: Number(first), second: Number(second) }
    }
    if (operationType === 'subtraction') {
      const [first, second] = data.split('-')
      return { type: operationType, first: Number(first), second: Number(second) }
    }
    if (operationType === 'multiplication') {
      const [first, second] = data.split('*')
      return { type: operationType, first: Number(first), second: Number(second) }
    }
    if (operationType === 'square_root') {
      const [_, first] = data.split('sqrt')
      return { type: operationType, first: Number(first) }
    }
    if (operationType === 'random_string') {
      return { type: operationType }
    }

    return null
  }
}