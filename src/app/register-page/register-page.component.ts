import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UtilService} from "../shared/services/util.service";

// В дальнейшем планировалось доделать данный функционал (отсуутствует на бэке)
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;


  public username: FormControl;
  public password: FormControl;
  public email: FormControl;
  public first_name: FormControl;
  public last_name: FormControl;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private utilService:UtilService) {
    this.form = new FormGroup({});
    this.username = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.first_name = new FormControl(null);
    this.last_name = new FormControl(null);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._snackBar.open('Регистрация не реализована. Зайдите под учетной записью: login:"admin@debunker.local" pass:"123"','Закрыть', {
      duration: 10000
    });
  }

  ngOnDestroy() {
  }
}
