import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy'

export default [{
  input: 'src/chai-promised.ts',
  output: {
    file: `dist/chai-promised.js`,
    format: 'es'
  },

  plugins: [
    typescript({
      tsconfig: 'src/tsconfig.json',
      target: 'es2017'
    }),
    copy( {
      targets: [
        { src: './src/@types/chai-promised.d.ts', dest: 'dist' }
      ]
    })
  ],
}];
