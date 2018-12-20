import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLogged = !!window.localStorage.getItem('user');
    if (!isLogged) {
      this.router.navigate(['/login']);
    }
    return isLogged;
  }
}
