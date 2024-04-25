import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddGuardComponent } from './add-guard/add-guard.component';
import { AuthComponent } from './auth/auth.component';
import { GuardhomeComponent } from './guardhome/guardhome.component';
import { Guardhome2Component } from './guardhome2/guardhome2.component';
import { HeaderComponent } from './header/header.component';
import { MessagesComponent } from './messages/messages.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler, HttpRequest } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TracklocationComponent } from './tracklocation/tracklocation.component';


@NgModule({
  declarations: [
    AppComponent,
    AddGuardComponent,
    AuthComponent,
    GuardhomeComponent,
    Guardhome2Component,
    HeaderComponent,
    MessagesComponent,
    SidebarComponent,
    UserhomeComponent,
    TracklocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
