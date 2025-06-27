import { MatDialog } from "@angular/material/dialog";

import { SectionAdder } from "./adding_sections/SectionAdder";
import { ActivitySectionExporter } from "./section_exporters/ActivitySectionExporter";
import { AudioSectionExporter } from "./section_exporters/AudioSectionExporter";
import { ContainerSectionExporter } from "./section_exporters/ContainerSectionExporter";
import { FileSectionExporter } from "./section_exporters/FileSectionExporter";
import { ImageSectionExporter } from "./section_exporters/ImageSectionExporter";
import { IntegrationSectionExporter } from "./section_exporters/IntegrationSectionExporter";
import { RawTextSectionExporter } from "./section_exporters/RawTextSectionExporter";
import { RichTextSectionExporter } from "./section_exporters/RichTextSectionExporter";
import { SectionExporter } from "./section_exporters/SectionExporter";
import { VideoSectionExporter } from "./section_exporters/VideoSectionExporter";
import { SectionData } from "./sections/Section";
import { ApiService } from "../../services/api.service";

/*

    Le "SectionTypesMap" est un annuaire contenant les différents exporteurs de sections. 

*/
export class SectionTypesMap
{
    private _defined_types: {[key:string]: SectionExporter<any, any>}
    private _sectionAdder: SectionAdder;

    constructor(private dialogs: MatDialog, private apiService: ApiService)
    {
        // Cet objet a pour clés les nom des types des sections, et pour valeur les exporteurs de section. 
        this._defined_types = {}

        this._sectionAdder = new SectionAdder(this, dialogs, apiService)
    }

    addTypeExporter(type_exporter: SectionExporter<any, any>): void
    {
        this._defined_types[type_exporter.type] = type_exporter;
    }

    getSectionAdder()
    {
        return this._sectionAdder;
    }

    getTypeExporterByType(typename: string)
    {
        return this._defined_types[typename];
    }

    getExporterTypes()
    {
        return Object.keys(this._defined_types);
    }

    export<SectionDataType>(data: SectionData<SectionDataType>)
    {
        return this.getTypeExporterByType(data.type).exportDataToSection(data.data, this)
    }
}


