export enum ErrorType {
  /** Message sending failure */
  SEND_FAILED = 'SEND_FAILED'
}

const defaultErrorMsg: {
  [key in ErrorType]: string;
} = {
  [ErrorType.SEND_FAILED]: 'Message sending failure'
}

export default class CustomError extends Error {
  public type: string;
  constructor(type: ErrorType, message?: string) {
    super(message || defaultErrorMsg[type])
    this.type = type;
  }
}