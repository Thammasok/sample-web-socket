import mongoose from 'mongoose'

export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(
      (process.env.MONGODB_URI as string) ||
        'mongodb://admin:password@localhost:27017/chat_db?authSource=admin',
    )
    console.info('MongoDB Connected...')
  } catch (err) {
    console.error('MongoDB Connection Error', err)
    process.exit(1)
  }
}

export const mongoDBDisconnect = async () => {
  try {
    await mongoose.disconnect()
    console.info('MongoDB Disconnected...')
  } catch (err) {
    console.error('MongoDB Disconnect Error', err)
    process.exit(1)
  }
}
