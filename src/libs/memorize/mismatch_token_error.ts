import RecognitionError from './recognition_error'

export default class MismatchTokenError extends RangeError {
  constructor(message?: string) {
    super(message)
  }
}
