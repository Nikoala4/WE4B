import { Inject, Injectable } from '@angular/core';
import { API_ENDPOINT } from './api-endpoint-config';
import { FileType } from '../../nooble/api-objs/FileType';

@Injectable({
  providedIn: 'root'
})
export class PathResolverService {

  constructor(@Inject(API_ENDPOINT) private endpointUrl: string) { }

  getResourcePath(resource: string, resourceType: FileType): string {
    let url = new URL(this.endpointUrl + '/resources/download');
    url.searchParams.set('id', resource);
    url.searchParams.set('type', resourceType.toString());

    return url.toString();
  }

  getBadgeThumbnailPath(name: string, level: number): string {
    let url = new URL(this.endpointUrl + '/badges/get-thumbnail');
    url.searchParams.set('name', name);
    url.searchParams.set('level', level.toString());

    return url.toString();
  }
}

