import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AccountModel } from '../db/models/account.model'

// Register controller
export const authRegister = async (req: Request, res: Response) => {
  try {
    const account = await register(req.body)

    res.status(StatusCodes.CREATED).json({
      message: 'Account created successfully',
      data: {
        id: account._id,
        displayName: account.displayName,
        email: account.email,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }
}

// Register service
interface IRegister {
  displayName: string
  email: string
  password: string
}

export const register = async (data: IRegister) => {
  const hashedPassword = await hashPassword(data.password)

  const account = await createNewAccount({
    ...data,
    password: hashedPassword,
  })

  return account
}

// Register Logic
const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}

// Register Repository
export const createNewAccount = async (data: IRegister) => {
  return await AccountModel.create(data)
}
