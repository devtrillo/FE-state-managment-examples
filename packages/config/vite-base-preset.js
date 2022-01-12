const react = require("@vitejs/plugin-react");

const buildConfiguration = (port = 9000) => ({
  plugins: [react()],
  server: {
    port,
  },
});

module.exports = buildConfiguration;
