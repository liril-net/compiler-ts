import Lexer from './lexer'
import Token from './token'
import MismatchTokenError from './mismatch_token_error'
import PreviousParseFailedError from './previous_parse_failed_error'

abstract class Parser {
  public static readonly FAILED: number = -1

  private input: Lexer
  private markers: Array<number> = []
  private lookahead: Array<Token> = []
  private p: number = 0

  constructor(input: Lexer) {
    this.input = input
    this.sync(1)
  }

  public consume(): void {
    this.p++

    if (this.p === this.lookahead.length && !this.isSpeculating) {
      this.p = 0
      this.lookahead = []
      this.clearMemo()
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

  public abstract clearMemo(): void

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

  public alreadyParsedRule(memoization: any): boolean {
    const memoI = memoization[this.index()]

    if (memoI === undefined) {
      return false
    }

    console.log(`parsed list before at index ${this.index()}; skip ahead to token index ${memoI} : ${this.lookahead[memoI].text}`)

    if (memoI === Parser.FAILED) {
      throw new PreviousParseFailedError()
    }

    this.seek(memoI)

    return true
  }

  public memoize(memoization: any, startTokenIndex: number, failed: boolean): void {
    memoization[startTokenIndex] = failed ? Parser.FAILED : this.index()
  }

  public index(): number {
    return this.p
  }
}

export default Parser
