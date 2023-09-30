const algorithm = 'bcrypt'

export const hash = async (password: string) => {
  const bcryptHash = await Bun.password.hash(password, {
    algorithm,
    cost: 4,
  })

  return bcryptHash
}

export const verify = async (password: string, hash: string) => await Bun.password.verify(password, hash)