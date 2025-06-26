import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { map, Observable, switchMap } from 'rxjs';
import { ApiGetClassDataResponse } from '../../../nooble/api-comm/GetClassDataResponse';
import { SectionExporterService } from '../../services/section-exporter.service';
import { Section } from '../../utils/classes/sections/Section';
import { SectionDisplayComponent } from "../section-display/section-display.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-class-overview',
  imports: [
    RouterLink,
    SectionDisplayComponent,
    CommonModule
  ],
  templateUrl: './class-overview.component.html',
  styleUrl: './class-overview.component.css'
})
export class ClassOverviewComponent implements OnInit {
  @ViewChild('mainClassContent', { static: true }) mainContentRef!: ElementRef;
  @ViewChild('classTitle', { static: true }) classTitleRef!: ElementRef;

  errorMessage: string = '';
  errorMessageDetails: string = '';
  sectionInitialized = false;
  
  classId: string | null = null;
  classData: ApiGetClassDataResponse | null = null;
  classContentSection: Section<any, any> | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sectionsService: SectionExporterService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap.pipe(
      map((params, index) => {
        const id = params.get('classId');

        console.log(id);

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
}
