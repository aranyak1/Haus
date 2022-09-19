class AppError extends Error {
  statusCode: Number = 100;
  status: String = 'error';
  isOperatonal: Boolean = true;
  jwtExpired: Boolean = false;
  constructor(message: string, statusCode: Number,jwtExpired:Boolean = false) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperatonal = true;
    this.jwtExpired = jwtExpired;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
