import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from './common/common-http.service';
import { constants } from '../constants/constants';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { List } from 'ckeditor5';
import { PatientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private commonhttp = inject(CommonHttpService);
  constructor() {}

  submitPatient(data: any): Observable<ApiResponse<number>> {
    return this.commonhttp.post(constants.ENDPOINTS.PATIENT.SUBMIT_PATIENT, data);
  }

  getAllPatients(): Observable<ApiResponse<PatientModel[]>> {
    return this.commonhttp.get(constants.ENDPOINTS.PATIENT.GET_PATIENT_LIST);
  }
  getPatientById(id: number): Observable<ApiResponse<PatientModel>> {
    return this.commonhttp.get(`${constants.ENDPOINTS.PATIENT.GET_PATIENT_BY_ID}/${id}`);
  }
}
