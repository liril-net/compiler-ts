import Token from './token'
import { init } from 'src/utils/enum'

abstract class Lexer {
  public static readonly Tokens = init([
    ['EOF_TYPE', 1]
  ])

  public static readonly EOF: undefined = undefined
  public static readonly EOF_TYPE: number = 1

  public input: string  // 输入字符串
  public p: number = 0  // 当前输入字符的下标
  public c: string  // 当前字符

  constructor(input: string) {
    this.input = input
    this.c = input.charAt(this.p)
  }

  public consume(): void {
    this.p++
    if (this.p >= this.input.length) {
      this.c = Lexer.EOF
    } else {
      this.c = this.input.charAt(this.p)
    }
  }

  public match(x: string): void {
    if (this.c === x) {
      this.consume()
    } else {
      throw new Error(`Expecting ${x}; found ${this.c}`)
    }
  }

  public abstract nextToken(): Token
  public abstract getTokenName(tokenType: number): string
}

export default Lexer
