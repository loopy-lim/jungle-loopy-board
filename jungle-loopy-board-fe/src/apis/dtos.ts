export class ResponseError extends Error {
  response: Response;
  constructor(response: Response) {
    super(response.statusText);
    this.name = 'ResponseError';
    this.response = response;
  }
}