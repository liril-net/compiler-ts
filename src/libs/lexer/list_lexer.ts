import Lexer from './lexer'
import Token from './token'

import { extend } from 'src/utils/enum'

export default class ListLexer extends Lexer {
  public static readonly Tokens = extend(Lexer.Tokens, [
    'NAME',
    'COMMA',
    'LBRACK',
    'RBRACK'
  ])

  constructor(input: string) {
    super(input)
  }

  public getTokenName(x: number): string {
    return ListLexer.Tokens[x]
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
          return new Token(ListLexer.Tokens.COMMA, ',')
        case '[':
          this.consume()
          return new Token(ListLexer.Tokens.LBRACK, '[')
        case ']':
          this.consume()
          return new Token(ListLexer.Tokens.RBRACK, ']')
        default:
          if (this.isLETTER()) {
            return this.NAME()
          } else {
            throw new Error(`invalid character: ${this.c}`)
          }
      }
    }
    return new Token(ListLexer.EOF_TYPE, '<EOF>')
  }

  private NAME(): Token {
    let buf = ''
    do {
      buf += this.c
      this.consume()
    } while (this.isLETTER())
    return new Token(ListLexer.Tokens.NAME, buf)
  }

  private WS(): void {
    while (this.c === ' '
      || this.c === '\t'
      || this.c === '\n'
      || this.c === '\r') {
      this.consume()
    }
  }
}

