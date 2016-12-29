import BacktrackLexer from './backtrack_lexer'

export default class Token {
  public type: number
  public text: string

  constructor(type: number, text: string) {
    this.type = type
    this.text = text
  }

  toString() {
    return `<'${this.text}', ${BacktrackLexer.Tokens[this.type]}>`
  }

}
