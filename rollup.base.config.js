import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  plugins: [
    resolve(),
    typescript({
      sourceMap: isDev
    }),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'runtime',
      extensions: ['.ts'],
      plugins: [
        ['@babel/plugin-transform-runtime', { 
          corejs: 3,
          proposals: true,
          useESModules: process.env.FORMAT === 'esm' || process.env.FORMAT === 'cjs' 
        }]
      ],
    }),
    commonjs(), //  Rollup convert `ms` to a esmodule
    
  ],
};
