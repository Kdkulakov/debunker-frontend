import {Injectable} from '@angular/core'
import {AuthService} from '../services/auth.service'
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {BehaviorSubject, filter, Observable, switchMap, take, throwError} from 'rxjs'
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UtilService} from "../services/util.service";

const TOKEN_HEADER_KEY = 'Authorization';

//HttpInterceptor
//Смысл перехватчика, что отлавливать запроы (реквесты)
// и добавляем в запросы в хедер авторизейшен(Authorization) значение нужный токен.
// со временем расширить обработку различных ошибок
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenStorage: TokenService,
    private utilService: UtilService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.tokenStorage.getAccessToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handleAuthError(authReq, next);
      }
      return throwError(error);
    }));
  }

// со временем  расширить(учитывая различныне варианты ошибок)
  private handleAuthError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenStorage.getRefreshToken();
      if (token)
        return this.auth.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenStorage.saveAccessToken(token.access);
            this.refreshTokenSubject.next(token.access);

            return next.handle(this.addTokenHeader(request, token.access));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.tokenStorage.signOut();
            return throwError(err);
          })
        );
    }
    if (this.isRefreshing) {
      this.handleRefresh401Error();
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

// со временем расширить(учитывая различныне варианты возникновения ошибок)
// пока когда происходит 401
  private handleRefresh401Error() {
    this.router.navigate(['/login'], {
      queryParams: {
        sessionFailed: true
      }
    })
    this.isRefreshing = false;
    this.tokenStorage.signOut();
    this._snackBar.open('Ошибка авторизации', 'Закрыть', {
      duration: this.utilService.CLOSE_TIME
    });
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)});
  }


}
