import { SectionExporter } from "./SectionExporter";
import { RichTextSection } from "../sections/RichTextSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section de texte riche à partir de ses données JSON

*/
export class RichTextSectionExporter extends SectionExporter<string, RichTextSection>
{
    constructor()
    {
        super("rich-text", "Texte riche");
    }

    override exportDataToSection(data: string, section_types_map: SectionTypesMap): RichTextSection
    {
        return new RichTextSection(data);
    }

    override createNew(section_types_map: SectionTypesMap): Promise<RichTextSection> {
        alert("Not implemented yet.")
        throw new Error("Method not implemented.");
    }
}


