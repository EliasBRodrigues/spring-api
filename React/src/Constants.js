const prod = {
  url: {
    API_BASE_URL: 'https://spring-api-one.vercel.app'
  }
};

const dev = {
  url: {
    API_BASE_URL: 'https://spring-service-9l87.onrender.com'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;