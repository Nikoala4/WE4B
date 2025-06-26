import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TabGroupComponent } from "../tab-group/tab-group.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SectionDisplayComponent } from "../section-display/section-display.component";
import { ApiGetClassDataResponse } from '../../../nooble/api-comm/GetClassDataResponse';
import { Section } from '../../utils/classes/sections/Section';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SectionExporterService } from '../../services/section-exporter.service';
import { ClassSettingsComponent } from "./class-settings/class-settings.component";
import { StudentsEditionComponent } from "./students-edition/students-edition.component";
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-class-editor',
  imports: [
    TabGroupComponent,
    CommonModule,
    SectionDisplayComponent,
    ClassSettingsComponent,
    StudentsEditionComponent,
    RouterLink
],
  templateUrl: './class-editor.component.html',
  styleUrl: './class-editor.component.css'
})
export class ClassEditorComponent {

  currentlyAdmin: boolean = false
  selectedTab: number = 0;

  errorMessage: string = '';
  errorMessageDetails: string = '';
  sectionInitialized = false;
  
  classId: string | null = null;
  classData: ApiGetClassDataResponse | null = null;
  classContentSection: Section<any, any> | null = null

  form = {
    name: '',
    description: ''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sectionsService: SectionExporterService,
    private dialogs: MatDialog
  ) {
    this.currentlyAdmin = authService.isAdmin();
  }

  selectTab(index: number)
  {
    this.selectedTab = index;
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap.pipe(
      map((params, index) => {
        const id = params.get('classId');

        return id;
      })
    ).subscribe(async (classId) => {
      this.classId = classId;

      if (!classId) {
        this.router.navigate(["/"]);
        return;
      }

      this.loadContent();
    });
  }
  
  loadContent() {
    this.apiService.classes.getData(this.classId!).subscribe({
      next: (data) => {
        this.classData = data;
        this.form = {
          name: data.name,
          description: data.description
        }
      },
      error: (error) => {
      this.handleError(error?.status || 0);
      }
    })

    this.apiService.classes.getContent(this.classId!).subscribe({
      next: (content) => {

        this.classContentSection = this.sectionsService.sections_map.export(content.content);

      },
      error: (error) => {
      this.handleError(error?.status || 0);
      }
    })
  }

  saveClassContent() {
    this.apiService.classes.edit(this.classId!, this.form.name, this.form.description, this.classContentSection!.json_data).subscribe({
      next: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "C'est noté!",
            text: "En espérant que vos étudiants vous réponde la même"
          }
        })

        this.loadContent();
      },
      error: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Le cours n'a pas pu être enregistré",
            text: "Peut-être devriez-vous aussi prendre un petit cours d'Angular?"
          }
        })
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

  onDeleteRequested() {
    this.dialogs.open(ConfirmDialogComponent, {
      data: {
        title: "Êtes-vous sûr de vouloir supprimer ce cours?",
        text: "Il se peut que des vacances s'en résulte de manière prématurée."
      }
    }).afterClosed().subscribe({
      next: (accepted: boolean) => {
        if (accepted)
        {
          this.apiService.classes.delete(this.classId!).subscribe({
            next: () => {
              this.dialogs.open(AlertDialogComponent, {
                data: {
                  title: "Cours supprimé avec succès!",
                  text: "Entre nous, vous le recréerez en septembre"
                }
              }).afterClosed().subscribe({
                next: () => {
                  this.router.navigate(["/"]);
                }
              })
            },
            error: () => {
              this.dialogs.open(AlertDialogComponent, {
                data: {
                  title: "Le cours n'a pas pu être supprimé",
                  text: "Vos droits d'administrateurs, par contre, peut-être..."
                }
              })
            }
          })
        }
      }
    })
  }
}
