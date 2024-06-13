export const environment = {
  production: false,
  appConfig: "dev",
  pathConfig: "./assets/config",
  apiSuffix: "/api/v1/",
  companyAppUrl: "https://az-qrcustomlink-back-company-appservice-dev.azurewebsites.net",
  contentAppUrl: "https://az-qrcustomlink-back-content-appservice-dev.azurewebsites.net",
  orderAppUrl: "https://az-qrcustomlink-back-order-appservice-dev.azurewebsites.net",
  identityAppUrl: "https://az-qrcustomlink-back-identity-appservice-dev.azurewebsites.net"
};

export const resources = {
  company: "companies",
  commercialSegments: "commercial-segments",
  documentTypes: "document-types",
  content: "contents",
  user: "users",
  order: "orders",
  link: "links"
};
