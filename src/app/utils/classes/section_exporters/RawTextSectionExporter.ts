import { SectionExporter } from "./SectionExporter";
import { RawTextSection } from "../sections/RawTextSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section de texte brut à partir de ses données JSON

*/
export class RawTextSectionExporter extends SectionExporter<string, RawTextSection>
{
    constructor()
    {
        super("raw-text", "Texte brute");
    }

    override exportDataToSection(data: string, section_types_map: SectionTypesMap): RawTextSection
    {
        return new RawTextSection(data);
    }

    async createNew()
    {
        return new RawTextSection("");
    }
}

