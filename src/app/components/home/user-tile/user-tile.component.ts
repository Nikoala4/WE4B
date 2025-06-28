import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Account } from '../../../../nooble/api-objs/Account';
import { PathResolverService } from '../../../services/path-resolver.service';
import { FileType } from '../../../../nooble/api-objs/FileType';
import { RoleTranscriberPipe } from '../../../pipes/role-transcriber.pipe';
import { Profile } from '../../../../nooble/api-objs/Profile';

@Component({
  selector: 'app-user-tile',
  imports: [
    RoleTranscriberPipe
  ],
  templateUrl: './user-tile.component.html',
  styleUrl: './user-tile.component.css'
})
export class UserTileComponent {
  @Input() userProfile!: Profile
  @Input() userId!: string

  constructor(
    private apiService: ApiService,
    private pathResolver: PathResolverService
  ) {}

  getUserProfileImageUrl()
  {
    if (this.userProfile.profile_image === null)
    {
      return this.pathResolver.getDefaultProfileImagePath()
    } else {
      return this.pathResolver.getResourcePath(this.userProfile.profile_image, FileType.PROFILE_ICON);
    }
  }
  

}
