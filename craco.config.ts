const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@sample': path.resolve(__dirname, 'src/containers/sample'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@types': path.resolve(__dirname, 'src/types/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@views': path.resolve(__dirname, 'src/views/'),
    },
  },
};

export {};
