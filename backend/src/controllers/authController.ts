import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import AppError from './../utils/appError';
import { Request, Response, NextFunction } from 'express';

const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: any,
  req: Request,
  res: Response,
) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    secure: true,
    sameSite: 'none',
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.cookies.jwt);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, req, res);
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  },
);

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // expire after 10 sec
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

export const protect = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    // console.log(req.headers);
    // 1) Getting token and check of it's there
    // from frontend we get jwt in header token like authorisation:Bearer jwttoken
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError(
          'You are not logged in! Please log in.',
          401,
        ),
      );
    }

    // 2) Verification token
    const jwtverify:any = promisify(jwt.verify);
    const decoded:any = await jwtverify(token, process.env.JWT_SECRET!);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401,
        ),
      );
    }


    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  },
);

export const restrictTo = (...roles:any) => {
  return (req:any, res:Response, next:NextFunction) => {
    // roles ['admin']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};