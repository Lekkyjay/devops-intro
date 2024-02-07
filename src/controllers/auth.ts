import { Request, Response } from 'express'
import { createUser, getUserByUsername } from '../models/User'
import bcrypt from 'bcrypt'

export const register = async (req: Request, res: Response) => {  
  try {
    const { username, password } = req.body
    const hashedPw = await bcrypt.hash(password, 12)

    if (!username || !password) return res.sendStatus(400)

    const userExists = await getUserByUsername(username)
    if (userExists) return res.sendStatus(400)

    const user = await createUser({ username, password: hashedPw })

    req.session.userId = user._id

    return res.status(200).json({
      status: 'success',
      data: { user }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ status: 'fail' })
  }
}

export const login = async (req: Request, res: Response) => {  
  try {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ status: 'fail', message: 'username and password are reqd!' })

    const user = await getUserByUsername(username)
    if (!user) return res.status(404).json({ status: 'fail', message: 'user not found' })

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) return res.status(400).json({ status: 'fail', message: 'incorrect credentials' })

    req.session.userId = user._id

    return res.status(200).json({ status: 'success' })
  }
  catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
