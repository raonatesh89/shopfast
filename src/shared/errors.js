// Custom error class for EXPECTED failures (not found, out of stock, etc.)
export class AppError extends Error {
  // message = text sent to client, statusCode = HTTP status (default 400 Bad Request)
  constructor(message, statusCode = 400) {
    super(message);               // Call the built-in Error constructor to store the message
    this.statusCode = statusCode; // Fastify reads "statusCode" automatically and uses it as the HTTP response code
  }
}
