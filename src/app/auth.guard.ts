import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(public router: Router) { }
    isLoggedIn!: boolean;
    canActivate(
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        debugger
        const isLogged = localStorage.getItem('systemGuid');
        if (!isLogged) {
            this.isLoggedIn = false;
            alert('you are not logged in');
            this.router.navigate(['/']);

        }
        else {
            this.isLoggedIn = true;
        }
        return this.isLoggedIn;
    }

}
