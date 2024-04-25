import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddGuardComponent } from './add-guard/add-guard.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { GuardhomeComponent } from './guardhome/guardhome.component';
import { MessagesComponent } from './messages/messages.component';
import { Guardhome2Component } from './guardhome2/guardhome2.component';
import { AuthGuard } from './auth.guard';
import { TracklocationComponent } from './tracklocation/tracklocation.component';


const routes: Routes = [
  { path: '', component: AuthComponent  },
  { path: 'main', component: UserhomeComponent},
  { path: 'addguard', component: AddGuardComponent },
  { path: 'home', component: GuardhomeComponent,children:[
    {path:'',component:Guardhome2Component},
    {path:'message',component:MessagesComponent},
    {path:'track',component:TracklocationComponent},
  ],canActivate: [AuthGuard] },
  {path:'**',component:AuthComponent}
  
];
//
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
