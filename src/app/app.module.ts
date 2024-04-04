import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PreloginLayoutComponent } from './modules/layouts/prelogin-layout/prelogin-layout.component';
import { MainLayoutComponent } from './modules/layouts/main-layout/main-layout.component';
import { LoginComponent } from './auth/prelogin/login/login.component';
import { DashboardComponent } from './modules/postlogin/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainLayoutComponent,
    PreloginLayoutComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,

  ],
  exports: [SharedModule],

  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
