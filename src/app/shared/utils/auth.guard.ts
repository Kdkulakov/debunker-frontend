import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router'
import {Observable, of} from 'rxjs'
import {Injectable} from '@angular/core'
import {AuthService} from '../services/auth.service'

// Guard
// для защиты роутов со стороны фронта
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  // с помощью конструктора инджектируем приватную переменную auth. Для проверки токена, т.е. может ли пользователь с токеном заходить на страницу.
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return of(true)
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }
  }


}
