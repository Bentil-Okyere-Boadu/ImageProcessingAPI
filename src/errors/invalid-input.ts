import CustomAPIError from './custom-error';
import { StatusCodes } from 'http-status-codes';

class InvalidInput extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default InvalidInput;