import RecognitionError from './recognition_error'

export default class PreviousParseFailedError extends RangeError {
  constructor(message?: string) {
    super(message)
  }
}
