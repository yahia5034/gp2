    import { Injectable, inject } from "@angular/core";
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
    import { Observable, catchError, map, take } from "rxjs"; // Update the path to your AuthenticationService
import { AuthserviceService } from "./authservice.service";

    @Injectable({
    providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {

    constructor(private authservice: AuthserviceService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            if (this.authservice.loginUser.email!='') {
                console.log(this.authservice.loginUser);
                return true; // User is logged in
              } else {
                this.router.navigate(['/']); // Navigate to login page
                return false;
    }}
    }
