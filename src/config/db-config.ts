export default () => ({
    database: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'bitcoin_price_db',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: process.env.DB_SYNC
    },
  });