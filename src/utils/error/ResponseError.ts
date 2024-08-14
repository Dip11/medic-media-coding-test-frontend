export class ResponseError<T> extends Error {
  constructor(
    message: string,
    public response: T,
  ) {
    super(message);
  }
}
