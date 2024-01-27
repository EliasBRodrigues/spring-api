const prod = {
  url: {
    API_BASE_URL: 'https://spring-service-9l87.onrender.com'
  }
};

const dev = {
  url: {
    API_BASE_URL: 'https://spring-api-one.vercel.app'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;