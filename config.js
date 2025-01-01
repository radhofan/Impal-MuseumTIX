const config = {
    development: {
      apiUrl: "http://localhost:9090", // Local API URL
    },
    production: {
      apiUrl: "http://mtixbackend-production.up.railway.app", // Production API URL
    },
  };
  
  //const environment = process.env.NODE_ENV || 'development'; 
  //const environment = 'development'; 
  const environment = 'production'; 
  
  export const configUrl = config[environment].apiUrl;