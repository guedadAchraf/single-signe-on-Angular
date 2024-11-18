import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth', // Keycloak server URL
  realm: 'my-sso-realm',             // Your Keycloak realm
  clientId: 'achraf1-client'          // Client ID for this application
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;