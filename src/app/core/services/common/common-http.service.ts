import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private http = inject(HttpClient);
  constructor() { }
  get<T>(endpoint: string, params?: any): Observable<T> {
    let url = `${environment.API_URL}${endpoint}`;
    return this.http.get<T>(url, { params });
  }
  
  // Generic POST request
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.API_URL}${endpoint}`, body);
  }

  // Generic PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${environment.API_URL}${endpoint}`, body);
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${environment.API_URL}${endpoint}`);
  }
}
