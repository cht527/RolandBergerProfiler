import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import baseConfig from './rollup.base.config';

const path = require('path');
const pkg = require('./package.json');
const isDev = process.env.NODE_ENV !== 'production';

const SERVE_CONFIG = {
  open: true,
  host: 'localhost',
  port: 3000,
  contentBase: ['dist', 'public'],

}

const builds = {
  esm: {
    output: {
      format: 'esm',
      file: path.resolve(__dirname, pkg.module),
      sourcemap:isDev

    },
    plugins:[]

  },
  cjs: {
    output: {
      format: 'cjs',
      file: path.resolve(__dirname, pkg.main),
      exports: 'default',
      sourcemap:isDev
    },
    plugins:[]
  },
  umd: {
    output: {
      format: 'iife',
      file: path.resolve(__dirname, pkg.unpkg.replace(/(.\w+)$/, '.min$1')),
      name: 'rolandberger',
      sourcemap:isDev,
      // globals: {
      //   // "@babel/runtime-corejs3/core-js-stable/instance/map":"_mapInstanceProperty",
      //   // "@babel/runtime-corejs3/core-js-stable/instance/slice":"_sliceInstanceProperty",        
      //   // "@babel/runtime-corejs3/core-js-stable/instance/for-each":"_forEachInstanceProperty",
      //   "d3": "d3"
      // }
    },
    plugins: [isDev && serve(SERVE_CONFIG)],
    

  },
}

const runtimeConfig = process.env.NODE_ENV === 'production' ? builds[process.env.FORMAT || 'esm'] : builds['umd'];

export default {
  ...baseConfig,
  output:runtimeConfig.output,
  plugins: [...baseConfig.plugins, ...runtimeConfig.plugins]
};
