import { inject, Injectable } from '@angular/core';
import { constants } from '../../constants/constants';
import { CommonHttpService } from './common-http.service';
import { DropDownItems } from '../../models/DropDownItam';
import { ApiResponse } from '../../models/apiResponse';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../models/departments';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private commonhttp = inject(CommonHttpService);
  constructor() { }
  getDropdownItems() : Observable<ApiResponse<DropDownItems[]>> {
    return this.commonhttp.get(constants.ENDPOINTS.MASTERS.GET_DROPDOWN_ITEMS); 
  }
  getDepartmentList() : Observable<ApiResponse<DepartmentModel[]>> {
    return this.commonhttp.get(constants.ENDPOINTS.MASTERS.GET_DEPARTMENT_LIST); 
  }
}
