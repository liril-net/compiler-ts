import Lexer from './lexer'
import Token from './token'

import { extend } from 'src/utils/enum'

export default class BacktrackLexer extends Lexer {
  public static readonly Tokens = extend(Lexer.Tokens, [
    'NAME',
    'COMMA',
    'LBRACK',
    'RBRACK',
    'EQUALS'
  ])

  constructor(input: string) {
    super(input)
  }

  public getTokenName(x: number): string {
    return BacktrackLexer.Tokens[x]
  }

  public isLETTER(): boolean {
    return (this.c >= 'a' && this.c <= 'z')
      || (this.c >= 'A' && this.c <= 'Z')
  }

  public nextToken(): Token {
    while (this.c !== undefined) {
      switch (this.c) {
        case ' ':
        case '\t':
        case '\n':
        case '\r':
        case '':
          this.WS()
          continue
        case ',':
          this.consume()
          return new Token(BacktrackLexer.Tokens.COMMA, ',')
        case '[':
          this.consume()
          return new Token(BacktrackLexer.Tokens.LBRACK, '[')
        case ']':
          this.consume()
          return new Token(BacktrackLexer.Tokens.RBRACK, ']')
        case '=':
          this.consume()
          return new Token(BacktrackLexer.Tokens.EQUALS, '=')
        default:
          if (this.isLETTER()) {
            return this.NAME()
          } else {
            throw new Error(`invalid character: ${this.c}`)
          }
      }
    }
    return new Token(BacktrackLexer.EOF_TYPE, '<EOF>')
  }

  private NAME(): Token {
    let buf = ''
    do {
      buf += this.c
      this.consume()
    } while (this.isLETTER())
    return new Token(BacktrackLexer.Tokens.NAME, buf)
  }

  private WS(): void {
    while (this.c === ' '
      || this.c === '\t'
      || this.c === '\n'
      || this.c === '\r') {
      this.advance()
    }
  }
}

