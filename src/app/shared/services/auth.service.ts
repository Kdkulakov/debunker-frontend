import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../classes/User";
import { Observable, Subscription} from "rxjs";
import { tap} from "rxjs/operators";
import {DBToken} from "../interfaces";
import {TokenService} from "./token.service";
import {MatSnackBar} from "@angular/material/snack-bar";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

//Сервис для Аутентификации
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  aSub: Subscription;

  constructor(private http: HttpClient,
              private tokenStorage: TokenService,
              private _snackBar: MatSnackBar) {
  }

  login(username: string, password: string): Observable<DBToken> {
    const user: User = {
      username: username,
      password: password,
      email: username,
      id: '1'
    }
    // асинхронный стрим rxjs
    return this.http.post<DBToken>('/api/token/', user)
      .pipe(
        tap(
          (dbToken: DBToken) => {
            this.tokenStorage.saveAccessToken(dbToken.access);
            this.tokenStorage.saveRefreshToken(dbToken.refresh);
            user.password='***';
            this.tokenStorage.saveUser(user);
          }
        )
      )
  }


  refreshToken(token: string) {
    return this.http.post('/api/token/refresh/', {
      refresh: token
    }, httpOptions);
  }

  logout() {
    this.tokenStorage.saveAccessToken(null);
    this.tokenStorage.saveRefreshToken(null);
    window.sessionStorage.clear(); // для того что бы не было поддержки сессии
  }

  isAuthenticated(): boolean {
    this.tokenStorage.getAccessToken()
    return !!this.tokenStorage.getAccessToken();
  }

}
