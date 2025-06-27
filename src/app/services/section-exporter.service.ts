import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionTypesMap } from '../utils/classes/SectionTypesMap';
import { ContainerSectionExporter } from '../utils/classes/section_exporters/ContainerSectionExporter';
import { RawTextSectionExporter } from '../utils/classes/section_exporters/RawTextSectionExporter';
import { RichTextSectionExporter } from '../utils/classes/section_exporters/RichTextSectionExporter';
import { ImageSectionExporter } from '../utils/classes/section_exporters/ImageSectionExporter';
import { FileSectionExporter } from '../utils/classes/section_exporters/FileSectionExporter';
import { ActivitySectionExporter } from '../utils/classes/section_exporters/ActivitySectionExporter';
import { IntegrationSectionExporter } from '../utils/classes/section_exporters/IntegrationSectionExporter';
import { VideoSectionExporter } from '../utils/classes/section_exporters/VideoSectionExporter';
import { AudioSectionExporter } from '../utils/classes/section_exporters/AudioSectionExporter';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SectionExporterService {

  public sections_map;

  constructor(
    dialogs: MatDialog,
    apiService: ApiService
  ) {
    this.sections_map = new SectionTypesMap(dialogs, apiService);

    this.sections_map.addTypeExporter(new ContainerSectionExporter());
    this.sections_map.addTypeExporter(new RawTextSectionExporter());
    this.sections_map.addTypeExporter(new RichTextSectionExporter());
    this.sections_map.addTypeExporter(new FileSectionExporter());
    this.sections_map.addTypeExporter(new ImageSectionExporter());
    this.sections_map.addTypeExporter(new ActivitySectionExporter());
    this.sections_map.addTypeExporter(new IntegrationSectionExporter());
    this.sections_map.addTypeExporter(new VideoSectionExporter());
    this.sections_map.addTypeExporter(new AudioSectionExporter());
  }

}
