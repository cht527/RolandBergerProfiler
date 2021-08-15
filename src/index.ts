import { init } from '../src/core/rolandBerger';

export default {
	init() {
		// @ts-ignore
		return init.apply(null, arguments);
	},
};
