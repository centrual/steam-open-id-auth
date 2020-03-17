import ExtendableError from "ts-error";

export class UrlGenerationFailedException extends ExtendableError {
  constructor() {
    super();
    this.name = 'UrlGenerationFailedException';
    this.message = 'Url generation is failed.';
  }
}
