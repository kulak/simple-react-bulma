import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const prod = process.env.NODE_ENV == 'prod';
const dev = !prod

let outputPlugins = []
if (prod) {
	outputPlugins = [terser()]
}

const sharedExternal = [
	'react', 
	'react-dom',
]

// each external module must be mapped to global variable
// the variable is defined by the module itself
// must find that variable to bind our bundle to it
const sharedGlobals = {
	'react': 'React',
	'react-dom': 'ReactDOM',
}

const sharedOutput = {
	dir: 'build',
	// es - for browser modules
	format: 'es',
	sourcemap: dev,
	// if 'named', then access from browser is based on value of name above.
	// app.ExportedName
	exports: 'named',
	globals: sharedGlobals,
	plugins: outputPlugins
}

const sharedPlugins = [
	typescript(),
]

export default [
{
	input: 'src/index.ts',
	external: sharedExternal,
	output: [
		Object.assign(sharedOutput, {
			// variable exported into Browser
			name: 'simpleReactComponents',
		}),
	],
	plugins: [
		// custom action example goes here,
		...sharedPlugins
	]
},
];
