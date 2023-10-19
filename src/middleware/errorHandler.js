import errorMessages from './errorMessages.js';

function errorHandler(err, req, res, next) {
  if (err.name === 'ProductNotFoundError') {
    const errorMessage = errorMessages.PRODUCT_NOT_FOUND;
    res.status(404).json({ status: "error", message: errorMessage });
  } else if (err.name === 'InvalidFieldsError') {
    const errorMessage = errorMessages.INVALID_REQUEST_FIELDS;
    res.status(400).json({ status: "error", message: errorMessage });
  } else {
    console.error(err);
    const errorMessage = errorMessages.GENERIC_ERROR;
    res.status(500).json({ status: "error", message: errorMessage });
  }
}

export default errorHandler;