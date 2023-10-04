import { Prisma } from '@prisma/client'

export type OperationCreate = Prisma.OperationCreateInput
export type OperationUpdate = Prisma.OperationUpdateInput

export type CreateOperationDto = {
  response: string
  userBalance: number
}