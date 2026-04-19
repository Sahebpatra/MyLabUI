import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 private router = inject(Router);
  loginData = {
    username: '',
    password: '',
    mobile: ''
  };

  ngOnInit(): void {

  }
  onUserLogin() {
    console.log('Logging in with Username:', this.loginData.username);
    this.router.navigateByUrl('admin/test-list');
  }
  onOtpLogin() {
    console.log('Sending OTP to:', this.loginData.mobile);
    this.router.navigateByUrl('admin/test-list');
  }
}
