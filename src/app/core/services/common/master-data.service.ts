import { inject, Injectable } from '@angular/core';
import { constants } from '../../constants/constants';
import { CommonHttpService } from './common-http.service';
import { DropDownItems } from '../../../shared/models/select-option.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Observable, map, shareReplay } from 'rxjs';
import { DepartmentModel } from '../../models/department.model';

@Injectable({ providedIn: 'root' })
export class MasterDataService {
  private commonhttp = inject(CommonHttpService);

  private dropdowns$ = this.commonhttp
    .get<
      ApiResponse<DropDownItems[]>
    >(constants.ENDPOINTS.MASTERS.GET_DROPDOWN_ITEMS)
    .pipe(
      map((res) => res.data || []),
      shareReplay(1),
    );
  readonly testGender$ = this.getFiltered('TestGender'); //used in New Test Page
  readonly gender$ = this.getFiltered('Gender'); // Used for common
  readonly testType$ = this.getFiltered('TestType');
  readonly ageType$ = this.getFiltered('AgeType');
  readonly samples$ = this.getFiltered('Sample');
  readonly sampleColors$ = this.getFiltered('SampleColor');
  readonly unitFieldTypes$ = this.getFiltered('UnitFieldType');
  readonly testTypes$ = this.getFiltered('TestType');
  readonly reqFields$ = this.getFiltered('RequiredFields');
  readonly phlebotomists$ = this.getFiltered('Phlebotomist');


  private getFiltered(type: string): Observable<DropDownItems[]> {
    return this.dropdowns$.pipe(
      map((data) => data.filter((item) => item.dropdownType === type)),
    );
  }

  // Departments
  readonly departments$ = this.commonhttp
    .get<ApiResponse<any>>(constants.ENDPOINTS.MASTERS.GET_DEPARTMENT_LIST)
    .pipe(
      map((res) => {return res.data.map((item: DepartmentModel) => ({ valueCode: item.deptId, displayText: item.deptName })); }),
      shareReplay(1),
    );
  //   // Departments
  // readonly doctors$ = this.commonhttp
  // .get<ApiResponse<DropDownItems[]>>(constants.ENDPOINTS.MASTERS.GET_DOCTORS_LIST)
  // .pipe(
  //   map((res) => res.data.map(item => ({
  //       valueCode: item.id, 
  //       displayText: item.displayText
  //   }))),
  //   shareReplay(1)
  // );
}
