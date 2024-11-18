import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { KeycloakInstance } from 'keycloak-js';
import { AuthService } from '../services/AuthService';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string = '';

  constructor(private keycloakService: KeycloakService,private authService:AuthService) {}

  async ngOnInit() {
    

    if (await this.keycloakService.isLoggedIn()) {
      const userProfile = await this.keycloakService.loadUserProfile();
      this.username = userProfile.username ?? '';
    }
  }

  logout() {
    this.keycloakService.logout(window.location.origin);
  }

  redirectTo(){

    //redirectUri: window.location.href='http://localhost:4202'
   this.authService.handleAuthenticationAndRedirect();
  }





}