import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLoginResponse } from '../../nooble/api-comm/LoginResponse';
import { ApiLogInfoResponse } from '../../nooble/api-comm/LogInfoResponse';
import { API_ENDPOINT } from './api-endpoint-config';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthenticationService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}
  
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

  launchForgotPasswordProcess(mail_address: string): Observable<ApiLoginResponse>
  {
    return this.http.post<ApiLoginResponse>(this.endpointUrl + "/connection/forgot-password", {
      username: mail_address
    });
  }

  logout(): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/connection/logout", {});
  }

}
