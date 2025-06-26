import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBuyBadgeResponse } from '../../../nooble/api-comm/BuyBadgeResponse';
import { ApiGetBadgeInfoResponse } from '../../../nooble/api-comm/GetBadgeInfoResponse';
import { ApiListBadgesResponse } from '../../../nooble/api-comm/ListBadgesResponse';

export class ApiBadgesService {

  constructor(private endpointUrl: string, private http: HttpClient) {}
  
  buy(badgeName: string): Observable<ApiBuyBadgeResponse>
  {
    return this.http.post<ApiBuyBadgeResponse>(this.endpointUrl + "/badges/buy", {
      name: badgeName
    }, {withCredentials: true});
  }

  getInformation(name: string, level: number): Observable<ApiGetBadgeInfoResponse>
  {
    let url = new URL(this.endpointUrl + "/badges/get-info");
    url.searchParams.set("name", name);
    url.searchParams.set("level", level.toString());

    return this.http.get<ApiGetBadgeInfoResponse>(url.toString(), {withCredentials: true});
  }

  getList(): Observable<ApiListBadgesResponse>
  {
    return this.http.get<ApiListBadgesResponse>(this.endpointUrl + "/badges/list", {withCredentials: true});
  }

}
