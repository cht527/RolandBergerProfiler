import baseConfig from './rollup.base.config';
import { terser } from 'rollup-plugin-terser';

const path = require('path');
const pkg = require('./package.json');

const builds = {
  esm: {
    output: {
      format: 'esm',
      file: path.resolve(__dirname, pkg.module),
    },
    plugins:[]

  },
  cjs: {
    output: {
      format: 'cjs',
      file: path.resolve(__dirname, pkg.main),
      exports: 'default',
    },
    plugins:[]
  },
  umd: {
    output: {
      format: 'umd',
      file: path.resolve(__dirname, pkg.unpkg.replace(/(.\w+)$/, '.min$1')),
      name: 'umd.min',
      globals: {
        "@babel/runtime-corejs3/core-js-stable/instance/map":"_mapInstanceProperty",
        "@babel/runtime-corejs3/core-js-stable/instance/slice":"_sliceInstanceProperty",        
        "@babel/runtime-corejs3/core-js-stable/instance/for-each":"_forEachInstanceProperty",
        "d3": "d3"
      }
    },
    plugins: [terser()],

  },
}

const runtimeConfig = builds[process.env.FORMAT || 'esm'];

export default {
  ...baseConfig,
  output:runtimeConfig.output,
  plugins: [...baseConfig.plugins, ...runtimeConfig.plugins]
};
