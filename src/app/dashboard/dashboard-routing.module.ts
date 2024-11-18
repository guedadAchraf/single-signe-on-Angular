import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

const approutes: Routes = [

  { path: 'dashbord', component:DashboardComponent },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(approutes),HttpClientModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
