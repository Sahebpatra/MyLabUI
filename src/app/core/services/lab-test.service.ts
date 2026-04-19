import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from './common/common-http.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LabTestService {
  private commonhttp = inject(CommonHttpService);
  constructor() { }
  getAllTests() : Observable<ApiResponse<any>>{
    return  this.commonhttp.get(constants.ENDPOINTS.LAB_TEST.GET_ALL_TESTS);
  }
  submitTest(data:any) : Observable<ApiResponse<any>>{
    return  this.commonhttp.post(constants.ENDPOINTS.LAB_TEST.SUBMIT_TEST,data);
  }
  getTestById(id: number) : Observable<ApiResponse<any>>{
    return  this.commonhttp.get(constants.ENDPOINTS.LAB_TEST.GET_TEST_BY_ID + '/' + id);
  }
}
