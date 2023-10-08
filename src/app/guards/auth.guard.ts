import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if (this.userService.isLoggedIn()) {
        // If the user is logged in, allow route activation
        return of(true);
      } else {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return of(false);
        // // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
        // return this.authService.authState
        // .pipe(
        //   map((success) => {
        //     if (success) {
        //       // Token refresh was successful, allow route activation
        //       return true;
        //     } else {
        //       // Token refresh failed, redirect to login with returnUrl
        //       this.router.navigate(['/login'], {
        //       queryParams: { returnUrl: state.url },
        //      });
        //       return false;
        //     }
        //   })
        // );
      }
  }
  
}
