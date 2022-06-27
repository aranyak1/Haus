class AppError extends Error {
  statusCode: Number = 100;
  status: String = 'error';
  isOperatonal: Boolean = true;
  constructor(message: string, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperatonal = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
