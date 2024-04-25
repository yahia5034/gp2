import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { response } from 'express';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class AuthserviceService {
  userlocation:string=''
  loginUser:any={
    username:'',
    password:'',
    email:'',
    phonenumber:'',
    userguard:{
      guardname:'',
      guardemail:'',
      guardphone:'',
      guardpassword:'',
    }
  }
  constructor(private http: HttpClient) {
      this.requestlocation.pipe(
        tap(() => console.log('Location request initiated')),  // Log the initiation
        switchMap(() => this.getlocation())  // Fetch the location
      ).subscribe(
        data => {
          this.locationchnaged.next(data);  // Emit the fetched data
        },
        error => {
          console.error('Error fetching location:', error);
        }
      );
  }
  requestlocation = new Subject<string>();
  locationchnaged = new Subject<any>();
  message$ = this.requestlocation.asObservable();
  guardid: any;
  signupuser(user: any) {
    this.http
      .post(
        'https://gp-project-67c16-default-rtdb.firebaseio.com/users.json',
        user
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  addguard(userdata: any) {
    return this.http
      .get('https://gp-project-67c16-default-rtdb.firebaseio.com/users.json')
      .pipe(
        map((responseData: any) => {
          const users = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              users.push({ ...responseData[key], id: key });
            }
          }
          return users;
        }),
        map((users: any[]) => {
          const user = users.find((u) => u.email ===this.loginUser.email );
          user.userguard = userdata;
          this.guardid = user.id;
          this.http
            .put(
              `https://gp-project-67c16-default-rtdb.firebaseio.com/users/${this.guardid}.json`,
              user
            )
            .subscribe((data) => {});
        })
      );
  }
  loginuser(user: any): Observable<any> {
    return this.http
      .get('https://gp-project-67c16-default-rtdb.firebaseio.com/users.json')
      .pipe(
        map((data: any) => {
          const users = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              users.push({ ...data[key], id: key });
            }
          }
          return users;
        }),
        map((users: any[]) => {
          const userauth = users.find((u) => u.email === user.email && u.password === user.password);
          this.loginUser=userauth
          if (userauth) {
            return userauth;
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  loginguard(user: any): Observable<any> {
    return this.http
      .get('https://gp-project-67c16-default-rtdb.firebaseio.com/users.json')
      .pipe(
        map((data: any) => {
          const users = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              users.push({ ...data[key], id: key });
            }
          }
          return users;
        }),
        map((users: any[]) => {
          const userauth = users.find((u) => u.userguard.guardemail === user.email && u.userguard.guardpassword === user.password);
          this.loginUser=userauth
          if (userauth) {
            return userauth;
          } else {
            throw new Error('User not found');
          }
        })
      );
  }
  // insertlocation(location: any) {
  //   this.http
  //     .post(
  //       'https://gp-project-67c16-default-rtdb.firebaseio.com/location.json',
  //       location
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
  getlocation(): Observable<any> {
    return this.http
      .get('https://gp-project-67c16-default-rtdb.firebaseio.com/location.json')
      .pipe(
        map((data: any) => {
          const locations = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              locations.push({ ...data[key], id: key });
            }
          }
          return locations;
        }),
        map((locations: any[]) => {
          const location = locations.filter((u) => u.from === this.loginUser.email && u.to === this.loginUser.userguard.guardemail);
          
          if (location) {
            return location;
          } else {
            throw new Error('User not found');
          }
        })
      );
  }
  requestlocationfun() {
    this.requestlocation.next('send');  // Trigger the location request
  }
  locationChanged$ = this.locationchnaged.asObservable();

    insertlocation(newlocation: any) {
      return this.http
      .get('https://gp-project-67c16-default-rtdb.firebaseio.com/location.json')
      .pipe(
        map((data: any) => {
          const locations = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              locations.push({ ...data[key], id: key });
            }
          }
          return locations;
        }),
        map((locations: any[]) => {
          const location = locations.find((u) => u.from === this.loginUser.email && u.to === this.loginUser.userguard.guardemail && u.date===newlocation.date && u.time===newlocation.time);
          
          if (location) {
            console.log('the login user is:', this.loginUser)
            console.log(location)
            return location;
          } else {
            console.log('in else')
           return this.http
      .post(
        'https://gp-project-67c16-default-rtdb.firebaseio.com/location.json',
        newlocation
      )
      .subscribe((data) => {
        console.log(data);
      });
          }
        })
      );
    
  }
}
