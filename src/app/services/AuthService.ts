import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak!: KeycloakInstance;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,private keycloakService: KeycloakService) {
    // Initialize Keycloak
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080/auth',
      realm: 'my-sso-realm',
      clientId: 'achraf1-client',
    });
  }

  public init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // Initialize Keycloak with required settings
      this.keycloak.init({
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: true,  // Enable iframe for session management
        enableLogging: true,
        redirectUri: window.location.origin + '/dashboard',
        flow: 'standard'
      })
      .then((authenticated) => {
        this.isAuthenticated.next(authenticated);
        resolve(authenticated);
      })
      .catch((error) => {
        console.error('Keycloak init error:', error);
        reject(error);
      });
    });
  }

  login(): Promise<void> {
    return this.keycloak.login({
      redirectUri: window.location.origin + '/dashboard'  // After login, redirect to the dashboard
    });
  }

  async logout(): Promise<void> {
    try {
      localStorage.clear();
      sessionStorage.clear();

      await this.keycloak.logout({
        redirectUri: window.location.origin + '/login'  // Redirect to login after logout
      });

      this.isAuthenticated.next(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticatedUser(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getTokene(): string | undefined {
    return this.keycloak.token;
  }


  async handleAuthenticationAndRedirect(): Promise<void> {
    const appUrl = 'http://localhost:4202';
  
    try {
      // Check if the user is authenticated
      const isLoggedIn = await this.keycloakService.isLoggedIn();
  
      if (isLoggedIn) {
        // Retrieve the token if authenticated
        const token = await this.keycloakService.getToken();
  
        if (token) {
          console.log('Token:', token);
          // Redirect to the app with the token in the URL
          window.location.href = `${appUrl}/dashboard?token=${encodeURIComponent(token)}`;
        } else {
          console.error('Token is undefined');
          // Fallback to login if token is unavailable
          await this.keycloakService.login();
        }
      } else {
        // Redirect to login if not authenticated
        await this.keycloakService.login();
      }
    } catch (error) {
      console.error('Error during authentication or token retrieval:', error);
      // Redirect to login in case of an error
      await this.keycloakService.login();
    }
  }
  


  token!: string | undefined;
  async getToken(): Promise<string |undefined> {
    try {
      // Ensure the user is authenticated
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      const appUrl = 'http://localhost:4202';
  
      if (isLoggedIn) {
        // Retrieve the token
        this.token = await this.keycloakService.getToken();
        console.log('Token:', this.token);
          return this.token;

        //return this.token || undefined;; // Return the token
      } else {
        // If not authenticated, redirect to login
        await this.keycloakService.login();
        return undefined; // Explicitly return null when redirecting to login
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      return undefined; // Explicitly return undefined on error
    }
  }
  async redirectToApp(): Promise<void> {
    console.log(await this.keycloakService.getToken())
    const appUrl = 'http://localhost:4202';
  
    // Use the correct method name getValue() with the correct case
    if (this.isAuthenticated.getValue()) {
      try {
        const token: string | undefined = await this.getToken(); // Await the asynchronous getToken() method
        if (token) {
          console.log(token);
          window.location.href = `${appUrl}/dashboard?token=${encodeURIComponent(token)}`;
        } else {
          console.error('Token is undefined');
          this.login(); // Fallback to login if token is not available
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        this.login(); // Handle token retrieval errors
      }
    } else {
      this.login(); // If not authenticated, initiate login
    }
  }
  


  //--------------------------
  /*async redirectToApp2() {
  try {
    // Get the token
    const token = await this.keycloakService.getToken();

    // Store the token in session storage
    sessionStorage.setItem('authToken', token);

    // Encode the token to make it URL-safe
    const encodedToken = encodeURIComponent(token);

    // Redirect to app2 with the token
    window.location.href = `http://localhost:4202/dashboard?token=${encodedToken}`;
  } catch (error) {
    console.error('Error getting token:', error);
  }
}*/

}  


  

