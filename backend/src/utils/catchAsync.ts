import { Request, Response, NextFunction } from 'express';

//fn is async function reference
export default (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //fn(req,res,next) calls the fn and fn(req,res,next).catch((err: any) => next(err)) is a promise
    fn(req, res, next).catch((err: any) => next(err));
  };
};
