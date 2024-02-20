import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'

export const PACKAGE_NAME = 'chai-promised';

export default [{
  input: 'src/chai-promised.ts',
  output: {
    file: `dist/${PACKAGE_NAME}.js`,
    format: 'es',
    sourcemap: true
  },

  plugins: [
    typescript({
      tsconfig: 'src/tsconfig.json',
      target: 'es2017'
    }),
    resolve(),
    commonjs({ extensions: ['.ts'] }),
    copy( {
      targets: [
        { src: './src/@types/chai-promised.d.ts', dest: 'dist' }
      ]
    })
  ],
}];
