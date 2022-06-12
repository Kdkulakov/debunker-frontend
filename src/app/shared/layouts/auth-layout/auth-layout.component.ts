import { Component, OnInit } from '@angular/core';

// Первый общий слой на котором с помощью router-outlet происходит управление роутингом на login-page или register-page
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
