import { mongoDBConnection, mongoDBDisconnect } from '../index'
import { createAccount } from './account.seed'

const main = async () => {
  await mongoDBConnection()
  
  // Seed data
  createAccount()

  mongoDBDisconnect()
  console.log('Seeding completed')
  process.exit(0)
}

main()
