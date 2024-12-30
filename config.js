const config = {
    development: {
      apiUrl: "http://localhost:9090", // Local API URL
    },
    production: {
      apiUrl: "https://your-deployed-api-url.com", // Production API URL
    },
  };
  
  const environment = process.env.NODE_ENV || 'development'; // Get the environment (default to 'development')
  
  export const configUrl = config[environment].apiUrl;