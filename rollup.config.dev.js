import path from 'path';
import rollupPluginCopy from 'rollup-plugin-copy';
import rollupPluginPostcss from 'rollup-plugin-postcss';
import rollupPluginTypescript from 'rollup-plugin-typescript2';
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
      sourcemap: true,
    },
  ],
  plugins: [
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
      minimize: false,
    }),
    rollupPluginTypescript({
      tsconfig: 'tsconfig.json'
    }),
    rollupPluginNodeResolve(),
  ],
};

export default optiosn;
