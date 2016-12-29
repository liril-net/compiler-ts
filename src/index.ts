import Token from './libs/lexer/token'
import BacktrackLexer from './libs/memorize/backtrack_lexer'
import BacktrackParser from './libs/memorize/backtrack_parser'

const input = '[a,b]=[c,d]'
const lexer: BacktrackLexer = new BacktrackLexer(input)
const parser: BacktrackParser = new BacktrackParser(lexer)

parser.stat()
