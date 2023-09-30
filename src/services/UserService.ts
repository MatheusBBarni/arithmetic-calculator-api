import { Prisma } from '@prisma/client'

import UserRepository from '../repositories/UserRepository'
import { hash, verify } from '../lib/bcrypt'
import { UserCreate } from '../types/User'

export default class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async register(data: UserCreate) {
    const user = {
      ...data,
      password: await hash(data.password)
    }

    return await this.userRepository.create(user)
  }

  async signIn(username: string, password: string) {
    const user = await this.userRepository.getByUsername(username)

    if (!user) {
      return false
    }

    const isMatch = await verify(password, user?.password)

    return isMatch
  }
}