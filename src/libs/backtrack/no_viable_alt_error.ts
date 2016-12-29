import RecognitionError from './recognition_error'

export default class NoViableAltError extends RangeError {
  constructor(message?: string) {
    super(message)
  }
}
