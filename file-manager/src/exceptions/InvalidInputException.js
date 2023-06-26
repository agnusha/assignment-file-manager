class InvalidInputException extends Error {
  constructor(message) {
    super(`Invalid input: ${message}`);
    this.name = 'InvalidInputException';
  }
}

export { InvalidInputException };