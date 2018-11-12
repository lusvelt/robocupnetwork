import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  constructor(private tokenService: TokenService, private router: Router) { }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const page = route.url[0].path;
  }*/

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const urlTree = state.url.split('/');
    const child = urlTree[1];

    if (child !== 'auth' && !this.tokenService.isTokenSet()) {
      this.redirectToLogin();
      return false;
    } else return true;
  }

  redirectToLogin() {
    this.router.navigate(['/auth', 'login']);
  }


}
