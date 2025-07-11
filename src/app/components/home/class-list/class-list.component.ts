import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ClassTileComponent } from "../class-tile/class-tile.component";
import { SearchBarComponent } from "../../../components/searchbar/searchbar.component";
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';

@Component({
  selector: 'app-class-list',
  imports: [
    ClassTileComponent,
    SearchBarComponent,
    CommonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit {

  @Input() classesIds: string[] = [];
  @Input() classes: {id: string, classe: ApiGetClassDataResponse}[] = [];
  @Input() admin: boolean = false

  @Output() submit: EventEmitter<string> = new EventEmitter();

  searchTerms: string = ''

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private api: ApiService,
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loadClasses();
  }

  loadClasses()
  {
    for (let classeId of this.classesIds){
      let currentClassId = classeId;

      this.api.classes.getData(currentClassId).subscribe(classe => {
        this.classes.push({
          id: currentClassId,
          classe: {
            description: classe.description,
            last_modification: classe.last_modification,
            last_modifier: classe.last_modifier,
            name: classe.name
          }
        })
      })
    };
  }

  onSearch(terms: string)
  {
    this.searchTerms = terms;
  }

  onSubmit(terms: string)
  {
    this.submit.emit(terms);
  }

}
