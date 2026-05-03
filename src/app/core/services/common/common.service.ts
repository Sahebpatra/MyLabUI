import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map, shareReplay, of } from 'rxjs';
import { CommonHttpService } from './common-http.service';
import { DropDownItems } from '../../../shared/models/select-option.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { DepartmentModel } from '../../models/department.model';
import { constants } from '../../constants/constants';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private commonhttp = inject(CommonHttpService);
  private dropdownCache = new Map<string, Observable<DropDownItems[]>>();

  getDropdownObservable(key: string): Observable<DropDownItems[]> {
    const self = this as any;
    const lowerKey = key.toLowerCase().replace('$', '');
    const foundProp = Object.keys(self).find(
      (p) => p.toLowerCase() === lowerKey || p.toLowerCase() === `${lowerKey}$`,
    );

    return foundProp && self[foundProp] instanceof Observable
      ? self[foundProp]
      : this.getDropdownByType(key);
  }
  private getDropdownByType(type: string): Observable<DropDownItems[]> {
    const cacheKey = type.trim().toLowerCase();
    if (this.dropdownCache.has(cacheKey))
      return this.dropdownCache.get(cacheKey)!;

    const params = new HttpParams().set('types', type.trim());
    const obs = this.commonhttp
      .get<
        ApiResponse<Record<string, DropDownItems[]>>
      >(constants.ENDPOINTS.COMMON.GET_DROPDOWNS, params)
      .pipe(
        map((res) => {
          const data = res.data ?? {};
          // Find the key in the response dictionary case-insensitively
          const apiKey =
            Object.keys(data).find((k) => k.toLowerCase() === cacheKey) || type;
          return data[apiKey] ?? [];
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      );

    this.dropdownCache.set(cacheKey, obs);
    return obs;
  }
  // Start : Dynamic list page API call
  getListPage(menuName: string): Observable<ApiResponse<any>> {
    return this.commonhttp.get<any>(
      constants.ENDPOINTS.COMMON.GET_LIST_PAGED.replace(':menuname', menuName),
    );
  }
   // End : Dynamic list page API call
   
  // Batch call used by preload()
  getDropdowns(types: string[]): Observable<Record<string, DropDownItems[]>> {
    const params = new HttpParams().set('types', types.join(','));
    return this.commonhttp
      .get<
        ApiResponse<Record<string, DropDownItems[]>>
      >(constants.ENDPOINTS.COMMON.GET_DROPDOWNS, params)
      .pipe(map((res) => res.data ?? {}));
  }

  // Hardcoded Observables
  // readonly gender$ = this.getDropdownByType('Gender');
  // readonly departments$ = this.commonhttp
  //   .get<
  //     ApiResponse<DepartmentModel[]>
  //   >(constants.ENDPOINTS.COMMON.GET_DEPARTMENT_LIST)
  //   .pipe(
  //     map((res) =>
  //       (res.data ?? []).map(
  //         (d) =>
  //           ({
  //             valueCode: `${d.deptId}`,
  //             displayText: d.deptName,
  //           }) as DropDownItems,
  //       ),
  //     ),
  //     shareReplay({ bufferSize: 1, refCount: true }),
  //   );

  preload(types: string[]) {
    this.getDropdowns(types).subscribe((grouped) => {
      Object.keys(grouped).forEach((key) => {
        this.dropdownCache.set(key, of(grouped[key]));
      });
    });
  }
  toNgbDate(isoString: string) {
    const date = new Date(isoString);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // JS is 0-indexed, Ngb is 1-indexed
      day: date.getDate(),
    };
  }

  // Helper for Time: ISO String/Time String -> {hour, minute}
  toNgbTime(timeValue: string) {
    const date = new Date(timeValue);
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }
}
