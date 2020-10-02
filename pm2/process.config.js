module.exports = {
  apps: [
    {
      name: 'cfi_card',
      script: './src/server/server.js',
      watch: "./",
      watch_delay: 5000,
      ignore_watch : [
        ".git",
        ".logs",
        "dist",
        "temp",
        "config",
        "pm2",
        "./*.js",
        "./*.json",
        "./*.md",
        "./src/client",
        "./src/migrations"
      ],
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      error_file: ".logs/err.log",
      out_file: ".logs/out.log",
      max_restarts: 2,
      restart_delay: 5000,
      env: {
        NODE_ENV: 'dev',
        LOGGER: 'logger'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      // instances : "4",
      // exec_mode : "cluster"
    }
  ]
};