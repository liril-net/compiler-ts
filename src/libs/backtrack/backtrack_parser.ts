import Parser from './parser'
import Lexer from './lexer'
import BacktrackLexer from './backtrack_lexer'

import RecognitionError from './recognition_error'
import NoViableAltError from './no_viable_alt_error'

export default class BacktrackParser extends Parser {
  constructor(input: Lexer) {
    super(input)
  }

  public stat(): void {
    if (this.speculate_stat_alt1()) {
      this.list()
      this.match(BacktrackLexer.Tokens.EOF_TYPE)
    } else if (this.speculate_stat_alt2()) {
      this.assign()
      this.match(BacktrackLexer.Tokens.EOF_TYPE)
    } else {
      throw new NoViableAltError(`expecting element, found ${this.LT(1)}`)
    }
  }

  public speculate_stat_alt1(): boolean {
    let success: boolean = true
    this.mark()
    try {
      this.list()
      this.match(Lexer.Tokens.EOF_TYPE)
    } catch (e) {
      success = false
    }
    this.release()
    return success
  }

  public speculate_stat_alt2(): boolean {
    let success: boolean = true
    this.mark()
    try {
      this.assign()
      this.match(Lexer.Tokens.EOF_TYPE)
    } catch (e) {
      success = false
    }
    this.release()
    return success
  }

  public assign(): void {
    this.list()
    this.match(BacktrackLexer.Tokens.EQUALS)
    this.list()
  }

  public list(): void {
    this.match(BacktrackLexer.Tokens.LBRACK)
    this.elements()
    this.match(BacktrackLexer.Tokens.RBRACK)
  }

  public elements(): void {
    this.element()
    while (this.LA(1) === BacktrackLexer.Tokens.COMMA) {
      this.match(BacktrackLexer.Tokens.COMMA)
      this.element()
    }
  }

  public element(): void {
    if (this.LA(1) === BacktrackLexer.Tokens.NAME && this.LA(2) === BacktrackLexer.Tokens.EQUALS) {
      this.match(BacktrackLexer.Tokens.NAME)
      this.match(BacktrackLexer.Tokens.EQUALS)
      this.match(BacktrackLexer.Tokens.NAME)
    } else if (this.LA(1) === BacktrackLexer.Tokens.NAME) {
      this.match(BacktrackLexer.Tokens.NAME)
    } else if (this.LA(1) === BacktrackLexer.Tokens.LBRACK) {
      this.list()
    } else {
      throw new NoViableAltError(`expecting element, found ${this.LT(1)}`)
    }
  }
}
