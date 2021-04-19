module.exports = {
  apps: [
    {
      name: 'cfi_card',
      script: './src/server/server.js',
      watch: [ './src/server/' ],
      ignore_watch : [ 'service', 'helpers' ],
      watch_delay: 5000,
      // ignore_watch : [
      //   ".git",
      //   ".logs",
      //   "dist",
      //   "temp",
      //   "config",
      //   "pm2",
      //   "./*.js",
      //   "./*.json",
      //   "./*.md",
      //   "./src/client",
      //   "./src/migrations"
      // ],
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      error_file: '.logs/err.log',
      out_file: '.logs/out.log',
      max_restarts: 4,
      restart_delay: 5000,
      env: {
        NODE_ENV: 'dev',
        'args': ['--ignore-watch=service']
        // LOGGER: 'logger'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      // instances : "4",
      // exec_mode : "cluster"
    },
    {
      name: 'cfi_card_cleaner',
      script: './src/server/service/tempCleaner.js',
      watch: [ './src/server/service' ],
      watch_delay: 1000,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '.logs/cleaner_err.log',
      out_file: '.logs/cleaner_out.log',
      env: {
        NODE_ENV: 'dev',
        DELAY_TIME: 60000, // 1 minute
        TIME_TO_REMOVE: '23:55'
      },
      env_production: {
        NODE_ENV: 'production',
        DELAY_TIME: 60000, // 1 minute
        TIME_TO_REMOVE: '23:55'
      },
    }
  ]
};