/* eslint-disable prettier/prettier */
import del from 'rollup-plugin-delete';
import path from 'path';
import rollupPluginCopy from 'rollup-plugin-copy';
import rollupPluginPostcss from 'rollup-plugin-postcss';
import rollupPluginTypescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve as rollupPluginNodeResolve } from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

/**
 * @type {import('rollup').RollupOptions}
 */
const optiosn = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'RollupTypescriptStarter',    // <-- change this name
      format: 'umd',
      sourcemap: false,
    },
  ],
  plugins: [
    del({
      targets: [
        path.join(__dirname, './dist/**/*'),
      ],
    }),
    terser({
      format: {
        comments: false,
      },
    }),
    rollupPluginCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dot: true,
          dest: path.join(__dirname, './dist/assets'),
        },
      ],
    }),
    rollupPluginPostcss({
      extract: path.join(__dirname, './dist/style.css'),
      minimize: true,
    }),
    rollupPluginTypescript({
      tsconfig: 'tsconfig.json'
    }),
    rollupPluginNodeResolve(),
  ],
};

export default optiosn;
