import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Safe } from '../../../nooble/api-objs/Safe';
import { BadgeDescriptor } from '../../../nooble/api-objs/BadgeDescriptor';

export class ApiSafeService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

  get(): Observable<Safe>
  {
    return this.http.get<Safe>(this.endpointUrl + "/safe", {withCredentials: true});
  }

  getBadges(): Observable<BadgeDescriptor[]> {
    return this.http.get<BadgeDescriptor[]>(this.endpointUrl + "/safe/badges", {withCredentials: true});
  }

  getDecorations(): Observable<string[]> {
    return this.http.get<string[]>(this.endpointUrl + "/safe/decorations", {withCredentials: true});
  }

  getQuota(): Observable<number> {
    return this.http.get<number>(this.endpointUrl + "/safe/quota", {withCredentials: true});
  }
  
}
