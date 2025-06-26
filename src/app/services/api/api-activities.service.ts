import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiActivityFileInitializationResponse } from '../../../nooble/api-comm/ActivityFileInitializationResponse';

export class ApiActivitiesService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

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
