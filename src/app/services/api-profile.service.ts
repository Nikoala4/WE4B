import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from './api-endpoint-config';
import { Profile } from '../../nooble/api-objs/Profile';

@Injectable({
  providedIn: 'root'
})
export class ApiProfileService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string, private http: HttpClient) {}
  
  getInformation(userId: string): Observable<Profile>
  {
    let url = new URL(this.endpointUrl + "/profile/get-info");
    url.searchParams.set("user_id", userId);

    return this.http.get<Profile>(url.toString());
  }

  modify(userId: string, firstName: string, lastName: string, profileImage: string|null, activeDecoration: string|null, activeBadges: string[], description: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/profile/modify", {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      active_decoration: activeDecoration,
      active_badges: activeBadges,
      description: description
    })
  }

  update(firstName: string, lastName: string, profileImage: string|null, activeDecoration: string|null, activeBadges: string[], description: string): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/profile/update", {
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      active_decoration: activeDecoration,
      active_badges: activeBadges,
      description: description
    })
  }
}

