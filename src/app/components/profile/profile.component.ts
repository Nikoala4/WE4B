import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Profile } from '../../../nooble/api-objs/Profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PathResolverService } from '../../services/path-resolver.service';
import { FileType } from '../../../nooble/api-objs/FileType';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiGetClassDataResponse } from '../../../nooble/api-comm/GetClassDataResponse';
import { ApiService } from '../../services/api.service';
import { BadgeDescriptor } from '../../../nooble/api-objs/BadgeDescriptor';
import { ApiGetBadgeInfoResponse } from '../../../nooble/api-comm/GetBadgeInfoResponse';
import { BadgePopupService } from '../../services/badge-popup.service';
import { RoleTranscriberPipe } from '../../pipes/role-transcriber.pipe';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
    CommonModule,
    RoleTranscriberPipe
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
  decorationUrl: string = '';

  classes: {data: ApiGetClassDataResponse, id: string}[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pathResolver: PathResolverService,
    private badgePopupService: BadgePopupService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap.pipe(
      switchMap((params, index) => {
        let currentUser = this.authService.currentUser;

        const id = params.get('userId') || currentUser?.id;

        if (currentUser !== null) {
          this.isAdmin = this.authService.isAdmin();
          this.isSelf = currentUser.id === id;
        } else {
          this.isAdmin = false;
          this.isSelf = false;
        }

        if (id) {
          this.loadedProfileId = id;
          return this.apiService.profile.getInformation(id);
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
        this.loadedProfileImageSrc = this.pathResolver.getDefaultProfileImagePath();
      }

      if (this.loadedProfile?.active_decoration)
      {
        this.apiService.decorations.getInformation(this.loadedProfile.active_decoration).subscribe({
          next: (decorationInformation) => {
            this.decorationUrl = this.pathResolver.getResourcePath(decorationInformation.image, FileType.DECORATION_BANNER);
          }
        })
      }

      if (data?.classes && data.classes.length > 0) {
        let loadedClasses: ApiGetClassDataResponse[] = [];

        for (let classId of data.classes) {
          let actualId = classId;

          this.apiService.classes.getData(classId).subscribe(classData => {
            loadedClasses.push(classData);

            if (actualId == data.classes![data.classes!.length - 1]) {
              this.classes = loadedClasses.map(data => {
                return {
                  data: data,
                  id: actualId
                }
              });
            }
          });
        }
      }
    });
  }

  getBadgeThumbnail(badge: BadgeDescriptor)
  {
    return this.pathResolver.getBadgeThumbnailPath(...badge);
  }

  openBadge(badge: BadgeDescriptor)
  {
    this.badgePopupService.openPopup(...badge);
  }

}
