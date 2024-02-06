import { Schema, model, models } from 'mongoose'
import { IUser } from '../utils/types'

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: [true, 'User must have username'], unique: true },
    password: { type: String, required: [true, 'User must have password'] },
  },
  { timestamps: true }
)

export const User = models.User || model<IUser>('User', userSchema)

//actions
export const getUsers = () => User.find()
export const getUserByUsername = (username: string) => User.findOne({ username })
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken })
export const getUserById = (id: string) => User.findById({ _id: id })
export const createUser = (user: Record<string, any>) => new User(user).save().then((user: any) => user.toObject())
export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, userData: Record<string, any>) => User.findOneAndUpdate({ id, userData })
