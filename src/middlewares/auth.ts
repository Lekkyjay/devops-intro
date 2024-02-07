import { NextFunction, Request, Response } from 'express'

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.session
  if (!userId) return res.status(401).json({ status: 'fail', message: 'unauthorized' })
  req.userId = userId
  next()
}
