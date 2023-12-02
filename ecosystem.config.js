module.exports = {
    apps: [
      {
        name: 'express-app',
        script: 'test-server.js',
        watch: true,
      },
      {
        name: 'selenium-tests',
        script: 'npm',
        args: 'test',
        watch: true,
      },
    ],
  };