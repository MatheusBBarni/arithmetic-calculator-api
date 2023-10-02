import UserService from '../services/UserService'
import { ControllerResult } from '../types/Api'
import { UserCreate } from '../types/User'

export default class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async register(data: UserCreate): Promise<ControllerResult> {
    const result = await this.userService.register(data)

    if (!result) {
      return {
        data: 'Username already in use',
        code: 409
      }
    }

    return {
      data: result,
      code: 201
    }
  }

  async signIn(username: string, password: string): Promise<ControllerResult> {
    const result = await this.userService.signIn(username, password)

    if (!result) {
      return {
        data: 'Could not Sign In user',
        code: 401
      }
    }

    if (typeof result === 'string') {
      return {
        data: result,
        code: 200
      }
    }

    return {
      data: 'User logged in successfully',
      code: 200
    }
  }

  async signOut(userId: string): Promise<ControllerResult> {
    const result = await this.userService.signOut(userId)

    if (typeof result === 'string') {
      return {
        data: result,
        code: 403
      }
    }

    if (!result) {
      return {
        data: 'User not logged out',
        code: 403
      }
    }

    return {
      data: 'User logged out',
      code: 200
    }
  }
}