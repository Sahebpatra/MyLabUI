import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from './common/common-http.service';
import { constants } from '../constants/endpoint.const.';
import { LoginRequest } from '../../shared/models/login-request.model';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private commonhttp = inject(CommonHttpService);
  constructor() { }

  requestOtp(credentials: LoginRequest) {
    return this.commonhttp.post<ApiResponse<any>>(constants.ENDPOINTS.AUTH.GET_OTP, credentials);
  }
  login(credentials: LoginRequest) {
    return this.commonhttp.post<ApiResponse<any>>(constants.ENDPOINTS.AUTH.LOGIN, credentials);
  }
}
