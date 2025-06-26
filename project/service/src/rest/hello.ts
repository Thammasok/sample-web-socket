import { NextFunction, Request, Response } from 'express'

export const hello = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({
    message: 'Hello World!',
  })
}
