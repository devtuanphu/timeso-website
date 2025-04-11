module.exports = {
  apps: [
    {
      name: 'website-timeso',
      script: 'npm',
      args: 'run start',
      cwd: '/root/timeso-website',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
