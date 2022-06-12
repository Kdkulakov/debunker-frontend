import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../shared/classes/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../shared/services/token.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public email: FormControl;
  public password: FormControl;

  aSub: Subscription;
  public user: User;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private tokenStorage: TokenService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.email = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    if (this.tokenStorage.getAccessToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    // после логина
    this.aSub = this.auth.login(this.email.value, this.password.value).subscribe(
      (tokens) => {
        this.router.navigate(['/newsanalysis'])
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error => {
        this.isLoginFailed = true;
        this.form.enable()
      }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
