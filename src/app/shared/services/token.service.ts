import {Injectable} from "@angular/core";

const USER_KEY = 'auth-user';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

//  Сервис для работы с Токенами(Хранение Access Token, Refresh Token)
// в дольнейшем доделать(расширить) функционал связанный с учетом пользователей(User)
@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveAccessToken(token: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.setItem(ACCESS_TOKEN, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({...user, accessToken: token});
    }
  }

  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    window.sessionStorage.setItem(REFRESH_TOKEN, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
