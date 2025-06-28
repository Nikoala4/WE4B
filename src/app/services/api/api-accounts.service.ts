import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../../../nooble/api-objs/Account';
import { Role } from '../../../nooble/api-objs/Role';

export class ApiAccountsService {

  constructor(private endpointUrl: string, private http: HttpClient) {}
  
  addAccount(mail: string, first_name: string, last_name: string): Observable<{new_account: string}>
  {
    return this.http.post<{new_account:string}>(this.endpointUrl + "/accounts/add", {
      mail,
      first_name,
      last_name
    }, {withCredentials: true});
  }

  deleteAccount(userId: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/delete", {
      user_id: userId
    }, {withCredentials: true});
  }

  getAccountInformation(userId: string): Observable<Account>
  {
    return this.http.get<Account>(this.endpointUrl + "/accounts/get-info?user_id=" + userId, {withCredentials: true});
  }

  modifyAccountMail(userId: string, newMail: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/modify-mail", {
      user_id: userId,
      mail: newMail
    }, {withCredentials: true});
  }

  modifyAccountRole(userId: string, newRole: Role): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/modify-role", {
      user_id: userId,
      role: newRole
    }, {withCredentials: true});
  }

  searchAccount(pattern: string, count: number, offset: number): Observable<Account[]>
  {
    let url = new URL(this.endpointUrl + "/accounts/search");
    url.searchParams.set("pattern", pattern);
    url.searchParams.set("count", count.toString());
    url.searchParams.set("offset", offset.toString());

    return this.http.get<Account[]>(url.toString(), {withCredentials: true});
  }

  updateSelfPassword(lastPassword: string, newPassword: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/accounts/update-password", {
      last_password: lastPassword,
      new_password: newPassword
    }, {withCredentials: true});
  }

}
