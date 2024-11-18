import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './dashboard/guards/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  
  { path: '', component: DashboardComponent , canActivate: [AuthGuard]
  },{
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
