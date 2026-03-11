export const getHealthData = async () => {
  // We're bypassing the DB for now to ensure the proxy works
  return {
    status: 'ok',
    proxy: 'working',
    uptime: process.uptime(), // Added a little dynamic Node.js info
    message: 'Greetings from the Express backend!',
  };
};
