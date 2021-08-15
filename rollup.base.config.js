import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
const path = require('path');
import typescript from 'rollup-plugin-typescript2';

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
      modulesOnly: true,
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: ['.js', '.ts'],
    }),
    commonjs(), //  Rollup convert `ms` to a esmodule
    eslint({
      fix: true,
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),

    !isDev && terser(),
  ],
  external: ['d3'],
};
