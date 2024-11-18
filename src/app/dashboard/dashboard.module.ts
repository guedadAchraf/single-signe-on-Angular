import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService,OAuthModule } from 'angular-oauth2-oidc';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {BrowserModule} from "@angular/platform-browser";
import { AuthService } from '../services/AuthService';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    OAuthModule.forRoot()
  ],
  providers:[
    OAuthService,
    AuthService,
    
  ]

})
export class DashboardModule { }
