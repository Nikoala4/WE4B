import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiProfileService } from '../services/api-profile.service';
import { Profile } from '../../nooble/api-objs/Profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PathResolverService } from '../services/path-resolver.service';
import { FileType } from '../../nooble/api-objs/FileType';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { ApiClassesService } from '../services/api-classes.service';
import { ApiGetClassDataResponse } from '../../nooble/api-comm/GetClassDataResponse';
import { Class } from '../../nooble/api-objs/Class';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
    NgIf,
    NgFor
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loadedProfile: Profile | null = null;
  loadedProfileImageSrc: string = "";
  loadedProfileId: string = "";
  isAdmin: boolean = false;
  isSelf: boolean = false;

  classes: {data: ApiGetClassDataResponse, id: string}[] = [];

  constructor(
    private profileService: ApiProfileService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pathResolver: PathResolverService,
    private classesService: ApiClassesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap.pipe(
      switchMap((params, index) => {
        const id = params.get('userId');

        let currentUser = this.authService.getCurrentUser();

        if (currentUser !== null) {
          this.isAdmin = this.authService.isAdmin();
          this.isSelf = currentUser.id === id;
        }

        if (id) {
          this.loadedProfileId = id;
          return this.profileService.getInformation(id);
        } else if (currentUser !== null ) {
          this.loadedProfileId = currentUser.id;
          return this.profileService.getInformation(currentUser.id);
        } else {
          return new Observable<null>(subscriber => {
            subscriber.next(null);
            subscriber.complete();
          });
        }
      })

    ).subscribe(data => {
      this.loadedProfile = data;
      if (this.loadedProfile?.profile_image)
      {
        this.loadedProfileImageSrc = this.pathResolver.getResourcePath(this.loadedProfile?.profile_image || '', FileType.PROFILE_ICON);
      } else {
        this.loadedProfileImageSrc = this.pathResolver.getDefaultprofileImagePath();
      }

      if (data?.classes && data.classes.length > 0) {
        let loadedClasses: ApiGetClassDataResponse[] = [];

        for (let classId of data.classes) {
          let actualId = classId;

          this.classesService.getData(classId).subscribe(classData => {
            loadedClasses.push(classData);

            if (actualId == data.classes![data.classes!.length - 1]) {
              this.classes = loadedClasses.map(data => {
                return {
                  data: data,
                  id: actualId
                }
              });
              console.log(this.classes);
            }
          });
        }
      }
    });
  }


}
