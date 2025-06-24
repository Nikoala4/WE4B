import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { ApiBuyBadgeResponse } from '../../nooble/api-comm/BuyBadgeResponse';
import { ApiGetBadgeInfoResponse } from '../../nooble/api-comm/GetBadgeInfoResponse';
import { Safe } from '../../nooble/api-objs/Safe';
import { BadgeDescriptor } from '../../nooble/api-objs/BadgeDescriptor';

@Injectable({
  providedIn: 'root'
})
export class ApiSafeService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}

  get(): Observable<Safe>
  {
    return this.http.get<Safe>(this.endpointUrl + "/safe");
  }

  getBadges(): Observable<BadgeDescriptor[]> {
    return this.http.get<BadgeDescriptor[]>(this.endpointUrl + "/safe/badges");
  }

  getDecorations(): Observable<string[]> {
    return this.http.get<string[]>(this.endpointUrl + "/safe/decorations");
  }

  getQuota(): Observable<number> {
    return this.http.get<number>(this.endpointUrl + "/safe/quota");
  }
  
}
