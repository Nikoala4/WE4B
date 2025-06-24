import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { ApiBuyBadgeResponse } from '../../nooble/api-comm/BuyBadgeResponse';
import { ApiGetBadgeInfoResponse } from '../../nooble/api-comm/GetBadgeInfoResponse';
import { ApiListBadgesResponse } from '../../nooble/api-comm/ListBadgesResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiBadgesService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}
  
  buy(badgeName: string): Observable<ApiBuyBadgeResponse>
  {
    return this.http.post<ApiBuyBadgeResponse>(this.endpointUrl + "/badges/buy", {
      name: badgeName
    });
  }

  getInformation(name: string, level: number): Observable<ApiGetBadgeInfoResponse>
  {
    let url = new URL(this.endpointUrl + "/badges/get-info");
    url.searchParams.set("name", name);
    url.searchParams.set("level", level.toString());

    return this.http.get<ApiGetBadgeInfoResponse>(url.toString());
  }

  getList(): Observable<ApiListBadgesResponse>
  {
    return this.http.get<ApiListBadgesResponse>(this.endpointUrl + "/badges/list");
  }

}
