import * as bcrypt from 'bcrypt'
import { AccountModel } from '../models/account.model'

const accountList = [
  {
    email: 'user1@test.com',
    displayName: 'User 1',
    password: 'password',
  },
  {
    email: 'user2@test.com',
    displayName: 'User 2',
    password: 'password',
  },
  {
    email: 'user3@test.com',
    displayName: 'User 3',
    password: 'password',
  },
  {
    email: 'user4@test.com',
    displayName: 'User 4',
    password: 'password',
  },
  {
    email: 'user5@test.com',
    displayName: 'User 5',
    password: 'password',
  },
]

export const createAccount = () => {
  try {
    accountList.forEach(async (data) => {
      const hashedPassword = bcrypt.hashSync(data.password, 10)

      const account = await AccountModel.create({
        email: data.email,
        displayName: data.displayName,
        password: hashedPassword,
      })

      console.log('Account created', account)
    })
  } catch (error) {
    console.log('Error creating account', error)
  }
}
