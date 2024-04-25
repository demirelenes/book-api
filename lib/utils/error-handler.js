const errorHandler = (err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);

  // Use the provided error code or default to 500 (Internal Server Error)
  const status = err.status || 500;

  // Use the provided error message or default to 'Internal Server Error'
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
};

export default errorHandler;
