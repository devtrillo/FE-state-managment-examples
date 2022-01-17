const react = require("@vitejs/plugin-react");

const buildConfiguration = (port = 9000) => ({
  plugins: [react()],
  server: {
    port,
    // host: "0.0.0.0",
  },
});

module.exports = buildConfiguration;
