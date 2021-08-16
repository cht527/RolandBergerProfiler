const path = require('path');

import baseConfig from './rollup.base.config';



export default {
  ...baseConfig,
  output: {
    // dir: 'dist',
    file: path.resolve(__dirname,`dist/index.js`),
    format: 'esm', // es module for import and tree shaking
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline'
    ,
  }
}
