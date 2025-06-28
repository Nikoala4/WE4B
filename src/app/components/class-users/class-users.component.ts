import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleTranscriberPipe } from '../../pipes/role-transcriber.pipe';
import { FormsModule } from '@angular/forms';
import { ApiGetClassDataResponse } from '../../../nooble/api-comm/GetClassDataResponse';
import { Account } from '../../../nooble/api-objs/Account';
import { PathResolverService } from '../../services/path-resolver.service';
import path from 'path';
import { FileType } from '../../../nooble/api-objs/FileType';
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs';
import { Profile } from '../../../nooble/api-objs/Profile';
import { UsersListComponent } from "../home/users-list/users-list.component";

@Component({
  selector: 'app-class-users',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    UsersListComponent
],
  templateUrl: './class-users.component.html',
  styleUrl: './class-users.component.css'
})
export class ClassUsersComponent implements OnInit {
  
  classId: string = "";
  classData: ApiGetClassDataResponse | null = null;

  errorMessage: string = '';
  errorMessageDetails: string = '';

  usersIds: string[] = []

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private pathResolver: PathResolverService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() 
  {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap.pipe(
      map((params, index) => {
        const id = params.get('classId');

        console.log(id);

        return id;
      })
    ).subscribe(async (classId) => {
      if (!classId) {
        this.router.navigate(["/"]);
        return;
      }

      this.classId = classId;

      this.loadContent();
    });
  }

  loadContent() {
    this.apiService.classes.getData(this.classId!).subscribe({
      next: (data) => {
        this.classData = data;
      },
      error: (error) => {
      this.handleError(error?.status || 0);
      }
    })

    this.apiService.classes.getAccounts(this.classId!).subscribe({
      next: (accounts) => {
        this.usersIds = accounts;
      },
      error: (error) => {
        this.handleError(error?.status || 0);
      }
    })
  }

  handleError(status: number) {
    this.errorMessage = "Impossible d'accéder à ce cours";

    let details;
    switch (status) {
      case 401:
        details = "Vous devez d'abord vous connecter";
        break;
      case 403:
        details = "Vous n'avez pas la permission d'accéder à ce cours";
        break;
      default:
        details = "Une erreur s'est produite lors du chargement du cours";
    }

    this.errorMessageDetails = details;
  }

  getImageUrl(profileImage: string | null)
  {
    if (profileImage === null)
    {
      return this.pathResolver.getDefaultProfileImagePath();
    } else {
      return this.pathResolver.getResourcePath(profileImage, FileType.PROFILE_ICON);
    }
  }

}
