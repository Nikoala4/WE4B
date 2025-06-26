import { SectionExporter } from "./SectionExporter";
import { FileSection, FileSectionData } from "../sections/FileSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section de fichiers à partir de ses données JSON

*/
export class FileSectionExporter extends SectionExporter<FileSectionData, FileSection>
{
    constructor()
    {
        super("file", "Fichier");
    }

    override exportDataToSection(data: FileSectionData, section_types_map: SectionTypesMap): FileSection
    {
        return new FileSection(data);
    }

    override async createNew()
    {
        return new FileSection({src:null, description : "", filename:""});
    }
}

