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
      return null
    }

    const isMatch = await verify(password, user?.password)

    if (!isMatch) {
      return null
    }

    if (user.status === 'ACTIVE') {
      return 'User already logged in'
    }

    const updatedUser = await this.userRepository.update(user.id, {
      ...user,
      status: 'ACTIVE'
    })

    return updatedUser
  }

  async signOut(userId: string): Promise<boolean | string> {
    const user = await this.userRepository.getById(userId)

    if (!user) {
      return 'User not found'
    }

    if (user?.status === 'INACTIVE') {
      return 'User is not logged in'
    }

    const updatedUser = await this.userRepository.update(user.id, {
      username: user.username,
      status: 'INACTIVE'
    })

    if (!updatedUser) {
      return 'Could not  update User'
    }

    return true
  }
}