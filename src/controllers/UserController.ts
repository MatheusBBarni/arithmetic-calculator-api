import UserService from '../services/UserService'
import { UserCreate } from '../types/User'

export default class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async register(data: UserCreate) {
    const result = await this.userService.register(data)

    if (!result) {
      return {
        message: "Username already in use",
        code: 409
      }
    }

    return {
      message: result,
      code: 201
    }
  }

  // async signIn(username: string, password: string) {
  //   const user = await this.userService.getByUsername(username)

  //   if (!user) {
  //     return false
  //   }

  //   const isMatch = await verify(password, user?.password)

  //   return isMatch
  // }
}