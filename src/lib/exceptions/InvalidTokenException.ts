import ExtendableError from "ts-error";

export class InvalidTokenException extends ExtendableError {
  constructor() {
    super();
    this.name = 'InvalidTokenException';
    this.message = 'Invalid token';
  }
}
