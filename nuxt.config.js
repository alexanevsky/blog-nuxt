import build        from './config/build';
import buildModules from './config/buildModules';
import components   from './config/components';
import css          from './config/css';
import head         from './config/head';
import loading      from './config/loading';
import modules      from './config/modules';
import plugins      from './config/plugins';
import router       from './config/router';

import auth         from './config/modules/auth';
import axios        from './config/modules/axios';
import proxy        from './config/modules/proxy';

export default {
  // Nuxt configuration
  target: 'server',

  build,
  buildModules,
  components,
  css,
  head,
  loading,
  modules,
  plugins,
  router,

  // Modules configuration
  auth,
  axios,
  proxy
}
