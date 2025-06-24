import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLoginResponse } from '../../nooble/api-comm/LoginResponse';
import { ApiLogInfoResponse } from '../../nooble/api-comm/LogInfoResponse';

export const API_ENDPOINT = new InjectionToken<String>('API_ENDPOINT');

@Injectable({
  providedIn: 'root'
})
export class ApiAuthenticationService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: String, private http: HttpClient) {}
  
  login(mail_address: string, password: string): Observable<ApiLoginResponse>
  {
    return this.http.post<ApiLoginResponse>(this.endpointUrl + "/connection/login", {
      username: mail_address,
      password: password
    });
  }

  getLogInfo(): Observable<ApiLogInfoResponse>
  {
    return this.http.get<ApiLogInfoResponse>(this.endpointUrl + "/connection/log-info");
  }

  launchForgotPasswordProcess(mail_address: String): Observable<ApiLoginResponse>
  {
    return this.http.post<ApiLoginResponse>(this.endpointUrl + "/connection/forgot-password", {
      username: mail_address
    });
  }

  logout(): Observable<Object|null>
  {
    return this.http.post(this.endpointUrl + "/connection/logout", {});
  }

}
