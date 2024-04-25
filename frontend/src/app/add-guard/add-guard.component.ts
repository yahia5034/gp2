import { Component } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-guard',
  templateUrl: './add-guard.component.html',
  styleUrl: './add-guard.component.css'
})
export class AddGuardComponent {
  constructor(private authservice:AuthserviceService,private route:Router){}
  backtomain(){
    this.route.navigate(['main'])
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      let user = {
        guardname: form.value.username,
        guardemail: form.value.email,
        guardphone: form.value.number,
        guardpassword: form.value.password,
      };
     this.authservice.addguard(user).subscribe((data:any)=>{
      console.log(data)
      this.route.navigate(['/main'])
     })

    }
  }
}
