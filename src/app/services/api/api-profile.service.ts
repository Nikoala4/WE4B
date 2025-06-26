import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../../../nooble/api-objs/Profile';
import loadashUtils from 'lodash';

export class ApiProfileService {

  constructor(private endpointUrl: string, private http: HttpClient) {}

  profileChanged = new Subject<Profile>();
  lastKnownProfile: Profile | null = null;
  
  getInformation(userId?: string): Observable<Profile>
  {
    let url = new URL(this.endpointUrl + "/profile/get-info");

    if (userId !== undefined)
    url.searchParams.set("user_id", userId);

    let request = this.http.get<Profile>(url.toString(), {withCredentials: true})
    request.subscribe({
      next: (response) => {
        if (!loadashUtils.isEqual(response, this.lastKnownProfile))
        {
          this.lastKnownProfile = response;
          this.profileChanged.next(this.lastKnownProfile);
        }
      }
    })

    return request;
  }

  modify(userId: string, firstName: string, lastName: string, profileImage: string|null, activeDecoration: string|null, activeBadges: string[], description: string | null): Observable<null>
  {
    return this.http.post<null>(this.endpointUrl + "/profile/modify", {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      active_decoration: activeDecoration,
      active_badges: activeBadges,
      description: description
    }, {withCredentials: true});
  }

  update(firstName: string, lastName: string, profileImage: string|null, activeDecoration: string|null, activeBadges: string[], description: string | null): Observable<null>
  {
    let request = this.http.post<null>(this.endpointUrl + "/profile/update", {
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      active_decoration: activeDecoration,
      active_badges: activeBadges,
      description: description
    }, {withCredentials: true})
    
    request.subscribe({
      next: () => {
        this.getInformation();
      }
    });

    return request;
  }
}

