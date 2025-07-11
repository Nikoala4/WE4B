import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLoginResponse } from '../../../nooble/api-comm/LoginResponse';
import { ApiLogInfoResponse } from '../../../nooble/api-comm/LogInfoResponse';

export class ApiAuthenticationService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

  login(mail_address: string, password: string): Observable<ApiLoginResponse>
  {
    return this.http.post<ApiLoginResponse>(this.endpointUrl + "/connection/login", {
      username: mail_address,
      password: password
    }, {withCredentials: true});
  }

  getLogInfo(): Observable<ApiLogInfoResponse>
  {
    return this.http.get<ApiLogInfoResponse>(this.endpointUrl + "/connection/log-info", {withCredentials: true});
  }

  launchForgotPasswordProcess(mail_address: string): Observable<ApiLoginResponse>
  {
    return this.http.post<ApiLoginResponse>(this.endpointUrl + "/connection/forgot-password", {
      username: mail_address
    }, {withCredentials: true});
  }

  logout(): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/connection/logout", {}, {withCredentials: true});
  }

}
