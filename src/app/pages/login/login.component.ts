import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/login-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ApiResponse } from '../../shared/models/api-response.model';
import { NotificationService } from '../../core/services/common/notification.service';
import { MenuService } from '../../core/services/menu.service';
import { MenuModel } from '../../shared/models/menu.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private menuService = inject(MenuService);
  private notify = inject(NotificationService);

  isOtpSent: boolean = false;
  loginData: LoginRequest = {
    identifier: '',
    otp: '',
    password: '',
  };

  ngOnInit(): void {}

  onOtpRequest() {
    this.authService.requestOtp(this.loginData).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          this.isOtpSent = true;
          // need to remove this line this is for development purpose
          if (res.data && res.data.otp) {
            this.loginData.otp = res.data.otp;
          }
        }
      },
      error: (err) => {
        this.notify.showError('Error while sending Otp');
      },
    });
  }

  onUserLogin() {
    this.notify.showInfo('Not implemented');
  }
  onOtpLogin() {
    console.log(this.loginData);

    this.authService.login(this.loginData).subscribe({
      next: (res: ApiResponse<MenuModel>) => {
        if (res.success) {
          console.log(res);
          if (res.data) {
            this.handleAuthSuccess(res);
          }
        }
      },
      error: () => {
        this.notify.showError('Error while Login with Otp');
      },
    });
  }
private handleAuthSuccess(res: ApiResponse<any>) {

  const authData = res.data;
  localStorage.setItem('access_token', authData.access_token);
  localStorage.setItem('user_details', this.loginData.identifier);
  sessionStorage.setItem('user_menus', JSON.stringify(authData.menus));
  
  this.menuService.updateMenuState(authData.menus);

  this.notify.showSuccess(res.message || 'Login Successful');
  this.router.navigateByUrl('test-list');
}
  resetOtpState() {
    this.isOtpSent = false;
    this.loginData.otp = '';
    this.loginData.identifier = '';
    this.loginData.password = '';
  }
}
