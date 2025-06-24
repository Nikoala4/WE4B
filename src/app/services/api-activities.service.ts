import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { ApiActivityFileInitializationResponse } from '../../nooble/api-comm/ActivityFileInitializationResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiActivitiesService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}

  initActivity(activityName: string): Observable<ApiActivityFileInitializationResponse>
  {
    return this.http.post<ApiActivityFileInitializationResponse>(this.endpointUrl + "/activities/init", {
      activity_name: activityName
    }, {withCredentials: true});
  }

  listExistingActivities(): Observable<string[]>
  {
    return this.http.get<string[]>(this.endpointUrl + "/activities/list", {withCredentials: true});
  }
  
}
