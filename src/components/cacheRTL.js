import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

export default createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  
  });
  