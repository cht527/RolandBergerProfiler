import { init } from './core/rolandBerger'

export default {
  init() {
      // @ts-ignore
      return init.apply(null, arguments);
  }
};
