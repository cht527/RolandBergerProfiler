import resolve from "rollup-plugin-node-resolve"; // rollup无法识别node_modules中的包
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs"; // 大部分都是commonjs格式的，要在rollup中使用必须先转为ES6语法
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";

const isDev = process.env.NODE_ENV !== "production";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "index",
  },
  plugins: [
    resolve(),
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ["src/**"],
      exclude: ["node_modules/**"],
    }),
    babel({
      exclude: "node_modules/**", // 只编译我们的源代码
      runtimeHelpers: true, // 使plugin-transform-runtime生效
    }),
    !isDev && terser(),
  ],
  external: ["d3"],
};
