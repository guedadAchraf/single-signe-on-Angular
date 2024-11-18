import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { map, take } from 'rxjs/operators';
import {OAuthService} from "angular-oauth2-oidc";
import { AuthService } from './AuthService';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
  export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override router: Router, protected keycloak: KeycloakService) {
      super(router, keycloak);
    }
  
    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      return new Promise(async (resolve) => {
        if (!this.authenticated) {
          await this.keycloak.login();
        }
        resolve(this.authenticated);
      });
    }






  }
