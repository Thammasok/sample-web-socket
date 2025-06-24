import { Model, model, Schema } from 'mongoose'
import { BaseModel, DocumentModel } from '../base'

interface IAccount extends BaseModel {
  displayName: string
  email: string
  password: string
  image?: string
}

export interface IAccountDocument
  extends Omit<IAccount, '_id' | 'createdAt' | 'updatedAt'>,
    DocumentModel {}

const accountModelSchema = new Schema<IAccountDocument>(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
)

export const AccountModel: Model<IAccountDocument> = model<IAccountDocument>(
  'account',
  accountModelSchema,
)
