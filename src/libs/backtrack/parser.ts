import Lexer from './lexer'
import Token from './token'
import MismatchTokenError from './mismatch_token_error'

abstract class Parser {
  input: Lexer
  markers: Array<number> = []
  lookahead: Array<Token> = []
  p: number = 0

  constructor(input: Lexer) {
    this.input = input
    this.sync(1)
  }

  public consume(): void {
    this.p++

    if (this.p === this.lookahead.length && !this.isSpeculating) {
      this.p = 0
      this.lookahead = []
    }
    this.sync(1)
  }

  public sync(i: number): void {
    if (this.p + i > this.lookahead.length) {
      this.fill(this.p + i - this.lookahead.length)
    }
  }

  public fill(n: number): void {
    for (let i = 1; i <= n; i++) {
      this.lookahead.push(this.input.nextToken())
    }
  }

  public LT(i: number): Token {
    this.sync(i)
    return this.lookahead[this.p + i - 1]
  }

  public LA(i: number): number {
    return this.LT(i).type
  }

  public match(x: number): void {
    if (this.LA(1) === x) {
      this.consume()
    } else {
      throw new MismatchTokenError(`expecting ${this.input.getTokenName(x)}, found ${this.LT(1)}`)
    }
  }

  public mark(): number {
    this.markers.push(this.p)
    return this.p
  }

  public release(): void {
    this.seek(this.markers.pop())
  }

  public seek(i: number): void {
    this.p = i
  }

  public isSpeculating(): boolean {
    return this.markers.length > 0
  }
}

export default Parser
