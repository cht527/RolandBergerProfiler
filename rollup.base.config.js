import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
const path = require('path');


export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  plugins: [
    resolve(),
    typescript(),
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
  external:  id => id.includes('@babel/runtime') || id.includes('d3'),
};
