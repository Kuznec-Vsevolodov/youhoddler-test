export default () => ({
    updateInterval: parseInt(process.env.UPDATE_INTERVAL, 10) || 10000,
    serviceCommission: parseFloat(process.env.SERVICE_COMMISSION) || 0.01,
    binancePriceApiUrl: process.env.BINANCE_API_REQUEST_URL,
  });