import { Component, ViewChild, viewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';
import { ElementRef } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @ViewChild('form', { static: false }) form!: NgForm | null;
  @ViewChild('checkbox', { static: false })
  checkbox!: ElementRef<HTMLInputElement>;
  constructor(private authservice: AuthserviceService, private route: Router) {}
  login: boolean = true;
  loginfun() {
    this.login = true;
    this.form?.reset();
  }
  signfun() {
    this.login = false;
    this.form?.reset();
  }
  onSubmit(form: NgForm) {
    if (this.login == true) {
      let user = {
        email: form.value.email,
        password: form.value.password,
      };
      if (this.checkbox && this.checkbox.nativeElement.checked) {
        this.authservice.loginguard(user).subscribe((data) => {
          if (data) {
            this.route.navigate(['/home']);
          }
        });
      } else {
        this.authservice.loginuser(user).subscribe((data) => {
          if (data) {
            this.route.navigate(['/main']);
          }
        });
      }
    } else {
      let user = {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        phonenumber: form.value.phonenumber,
        userguard: {
          guardname: '',
          guardemail: '',
          guardphone: '',
          guardpassword: '',
        },
      };
      this.authservice.signupuser(user);
      this.route.navigate(['/main']);
    }
  }
}
