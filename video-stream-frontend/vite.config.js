import reactRefresh from '@vitejs/plugin-react';

export default {
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
};