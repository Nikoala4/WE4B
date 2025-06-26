import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Activity } from '../../../nooble/api-objs/Activity';
import { ApiActivityRawResponse } from '../../../nooble/api-comm/ActivityRawResponse';

export class ApiThreadService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

  get(notreadonly: boolean, count: number, offset: number): Observable<Activity[]> {
    let url = new URL(this.endpointUrl + "/thread/get");
    url.searchParams.set("notreadonly", notreadonly.toString());
    url.searchParams.set("count", count.toString());
    url.searchParams.set("offset", offset.toString());

    return this.http.get<ApiActivityRawResponse[]>(url.toString(), {withCredentials: true}).pipe(
      map(
        response => response.map(
          item => ({
            ...item,
            activity_data: {
              ...item.activity_data,
              date: new Date(item.activity_data.date * 1000)
            }
          })
        )
      )
    );
  }

  markAsRead(activities: string[]): Observable<null> {
    return this.http.post<null>(this.endpointUrl + "/thread/mark-as-read", {
      activities
    }, {withCredentials: true});
  }
}
