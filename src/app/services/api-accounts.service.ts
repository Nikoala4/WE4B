import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { Account } from '../../nooble/api-objs/Account';
import { Role } from '../../nooble/api-objs/Role';

@Injectable({
  providedIn: 'root'
})
export class ApiAccountsService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: String, private http: HttpClient) {}
  
  addAccount(mail: String, first_name: String, last_name: String): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/add", {
      mail,
      first_name,
      last_name
    });
  }

  deleteAccount(userId: String): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/delete", {
      user_id: userId
    });
  }

  getAccountInformation(userId: String): Observable<Account>
  {
    return this.http.get<Account>(this.endpointUrl + "/accounts/get-info?user_id=" + userId);
  }

  modifyAccountMail(userId: String, newMail: String): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/modify-mail", {
      user_id: userId,
      mail: newMail
    });
  }

  modifyAccountRole(userId: String, newRole: Role): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/modify-role", {
      user_id: userId,
      role: newRole
    });
  }

  searchAccount(pattern: string, count: Number, offset: Number): Observable<Account[]>
  {
    let url = new URL(this.endpointUrl + "/accounts/search");
    url.searchParams.set("pattern", pattern);
    url.searchParams.set("count", count.toString());
    url.searchParams.set("offset", offset.toString());

    return this.http.get<Account[]>(url.toString());
  }

  updateSelfPassword(lastPassword: string, newPassword: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/update-password", {
      last_password: lastPassword,
      new_password: newPassword
    });
  }

}
