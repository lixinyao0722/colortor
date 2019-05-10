const path = require('path');
const {formatFileConst2Var} = require('../..');

function testFormatFileConst2Var() {
  const varFilePatterns: string[] = [path.resolve(__dirname, 'files/var/**/*.scss')];
  const sourceCodePatterns: string[] = [path.resolve(__dirname, 'files/source-codes/**/*.vue')];

  formatFileConst2Var(varFilePatterns, sourceCodePatterns)
    .then(formatMap => console.log('success ...', formatMap))
    .catch(e => console.log('error', e));
}

testFormatFileConst2Var();
