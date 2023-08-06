import path from "path";
import { fileURLToPath } from "node:url"
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  plugins: [
    resolve(),
    typescript({
      sourceMap: isDev
    }),
    commonjs(), //  Rollup convert `ms` to a esmodule
    
  ],
};
