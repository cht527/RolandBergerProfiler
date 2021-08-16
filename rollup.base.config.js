import resolve from '@rollup/plugin-node-resolve';
import babel, {getBabelOutputPlugin} from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import typescript from 'rollup-plugin-typescript2';
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
      modulesOnly: true,
    }),
    typescript(),
    // getBabelOutputPlugin({
    //     configFile: path.resolve(__dirname, '.babelrc.json'),
    //     allowAllFormats: true
    // }),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'runtime',
      extensions: ['.ts'],
      plugins: [
        ['@babel/plugin-transform-runtime', { corejs: 3 }],
      ],
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
  external: ['d3',id => id.includes('@babel/runtime')],
};
