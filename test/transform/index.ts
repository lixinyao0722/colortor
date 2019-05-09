// import { formatFileConst2Var } from '../..';
// import * as path from 'path';

// import {formatFileConst2Var} = require('../../')
const path = require('path');
const {formatFileConst2Var} = require('../..');

formatFileConst2Var(
  [path.resolve(__dirname, 'files/var/**/*.scss')],
  [path.resolve(__dirname, 'files/source-codes/**/*.vue')],
);
