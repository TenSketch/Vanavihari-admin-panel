import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/postlogin/dashboard/dashboard.component';
import { LoginComponent } from './auth/prelogin/login/login.component';


const routes: Routes = [
{path:'dashboard', component:DashboardComponent}, 
{path:'login',component:LoginComponent},

 {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
