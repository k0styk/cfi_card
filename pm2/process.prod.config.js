module.exports = {
  apps: [
    {
      name: 'cfi_card_cleaner.ans.aero',
      script: './src/server/service/tempCleaner.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '.logs/cleaner_err.log',
      out_file: '.logs/cleaner_out.log',
      max_restarts: 10,
      restart_delay: 5000,
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
    },
    {
      name: 'cfi_card.ans.aero',
      script: './src/server/server.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: true,
      error_file: '.logs/err.log',
      out_file: '.logs/out.log',
      max_restarts: 5,
      restart_delay: 5000,
      env: {
        NODE_ENV: 'dev',
        LOGGER: 'logger'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      listen_timeout : 10000,
      kill_timeout: 3000,
      wait_ready: true,
      shutdown_with_message: true,
      exec_mode : 'cluster',
      instances : 4,
    },
  ]
};