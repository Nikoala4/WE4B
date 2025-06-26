import { Inject, Injectable } from '@angular/core';
import { ApiAccountsService } from './api/api-accounts.service';
import { ApiActivitiesService } from './api/api-activities.service';
import { ApiAuthenticationService } from './api/api-authentication.service';
import { ApiBadgesService } from './api/api-badges.service';
import { ApiClassesService } from './api/api-classes.service';
import { ApiDecorationsService } from './api/api-decorations.service';
import { ApiProfileService } from './api/api-profile.service';
import { ApiResourcesService } from './api/api-resources.service';
import { ApiSafeService } from './api/api-safe.service';
import { API_ENDPOINT } from './config/api-endpoint-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _accounts: ApiAccountsService;
  private _activities: ApiActivitiesService;
  private _authentication: ApiAuthenticationService;
  private _badges: ApiBadgesService;
  private _classes: ApiClassesService;
  private _decorations: ApiDecorationsService;
  private _profile: ApiProfileService;
  private _resources: ApiResourcesService;
  private _safe: ApiSafeService;

  constructor(@Inject(API_ENDPOINT) apiEndpoint: string, httpClient: HttpClient) {
    this._accounts = new ApiAccountsService(apiEndpoint, httpClient)
    this._activities = new ApiActivitiesService(apiEndpoint, httpClient)
    this._authentication = new ApiAuthenticationService(apiEndpoint, httpClient)
    this._badges = new ApiBadgesService(apiEndpoint, httpClient)
    this._classes = new ApiClassesService(apiEndpoint, httpClient)
    this._decorations = new ApiDecorationsService(apiEndpoint, httpClient)
    this._profile = new ApiProfileService(apiEndpoint, httpClient)
    this._resources = new ApiResourcesService(apiEndpoint, httpClient)
    this._safe = new ApiSafeService(apiEndpoint, httpClient)
  }

  get accounts()
  {
    return this._accounts;
  }

  get activities()
  {
    return this._activities;
  }

  get authentication()
  {
    return this._authentication;
  }

  get badges()
  {
    return this._badges;
  }

  get classes()
  {
    return this._classes;
  }

  get decorations()
  {
    return this._decorations;
  }

  get profile()
  {
    return this._profile;
  }

  get resources()
  {
    return this._resources;
  }

  get safe()
  {
    return this._safe;
  }
}
