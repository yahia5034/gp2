import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  {
 
  constructor(private route :Router,private router:ActivatedRoute,private auth:AuthserviceService){}
  gotohome(){
    this.route.navigate(['/home'],{relativeTo:this.router})
  }
  gotomessage(){
    this.route.navigate(['message'],{relativeTo:this.router})
  }
  logout(){
    this.route.navigate(['/auth'],{relativeTo:this.router})
  }
  getlocation(){
    this.route.navigate(['track'],{relativeTo:this.router})
}}
  //   this.auth.requestlocationfun()
  //   this.auth.locationChanged$.subscribe(
  //     data => {
  //       console.log(data);
  //     },
  //     error => {
  //       console.error('Error receiving location:', error);
  //     }
  //   );// }