import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {RouterOutlet} from "@angular/router";
import {NavModule} from "./nav/nav.module";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthConfig } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/AuthService';


export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/my-sso-realm',
  redirectUri: window.location.origin + '/dashboard',
  clientId: 'achraf1-client',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  requireHttps: false,
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: true,
  disableAtHashCheck: true,
  clearHashAfterLogin: true,
};


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',  // Make sure this matches your Keycloak URL
        realm: 'my-sso-realm',
        clientId: 'achraf1-client'
      },
      initOptions: {
        onLoad: 'check-sso',
       // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        redirectUri: window.location.origin
      }
    });
}






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,DashboardModule,RouterOutlet,NavModule,KeycloakAngularModule
  ],
  providers: [ {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
