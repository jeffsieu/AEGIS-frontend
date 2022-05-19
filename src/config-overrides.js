const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@assets': 'src/assets',
    '@components': 'src/components',
    '@sample': 'src/sample',
    '@services': 'src/services',
    '@store': 'src/store',
    '@utils': 'src/utils',
    '@views': 'src/views'
  })(config);

  return config;
};