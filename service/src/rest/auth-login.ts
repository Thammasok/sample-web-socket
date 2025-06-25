import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AccountModel } from '../db/models/account.model'

// Login controller
export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const logged = await login(email, password)

    res.status(StatusCodes.OK).json({
      id: logged._id,
      displayName: logged.displayName,
      email: logged.email,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }
}

// Login service
export const login = async (email: string, password: string) => {
  const account = await getAccountByEmail(email)

  if (!account) {
    throw new Error('Account not found')
  }

  const isPasswordValid = await comparePassword(password, account.password)

  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  return account
}

// Login Logic
const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}

// Login Repository
export const getAccountByEmail = async (email: string) => {
  return await AccountModel.findOne({ email })
}
