import { EErrors } from '../errors/enum.js';

export default (error, req, res, next) => {
  switch (error.cause) {
    // ERR 1
    case EErrors.ROUTING_ERROR:
      res.status(404).send({ status: 'Error', error: error.name, cause: error.cause });
      break;
    // ERR 2
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).send({ status: 'Error', error: error.name, cause: error.cause });
      break;
    // ERR 3
    case EErrors.DB_READ_ERROR:
      res.status(500).send({ status: 'Error', error: error.name, cause: error.cause });
      break;
    // ERR 4
    case EErrors.DB_CONNECTION_ERROR:
      res.status(500).send({ status: 'Error', error: error.name, cause: error.cause });
      break;
    default:
      res.status(500).send({ status: 'Error', error: 'Unexpected error' });
      break;
  }
};
