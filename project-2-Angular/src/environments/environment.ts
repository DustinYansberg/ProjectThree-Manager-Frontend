export const environment = {
  production: false,
  auth0: {
    domain: 'dev-gdc5jpwq2csxld4e.us.auth0.com',
    clientId: 'ZKNe8OtTLSqrooRm0gP8g2BPwsiqq06W',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/callback',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:6060',
  },
};
