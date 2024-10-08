export class ResponseError extends Error {
  error: string;
  message: string;
  statusCode: number;
  constructor(response: Record<string, any>) {
    super(response.message);
    this.name = 'ResponseError';
    this.error = response.error;
    this.message = response.message;
    this.statusCode = response.statusCode;
  }
}