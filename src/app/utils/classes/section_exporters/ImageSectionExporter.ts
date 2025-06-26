import { SectionExporter } from "./SectionExporter";
import { ImageSection } from "../sections/ImageSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section d'images à partir de ses données JSON

*/
export class ImageSectionExporter extends SectionExporter<string, ImageSection>
{
    constructor()
    {
        super("image", "Image");
    }

    override exportDataToSection(data: string, section_types_map: SectionTypesMap): ImageSection
    {
        return new ImageSection(data);
    }

    override createNew(section_types_map: SectionTypesMap): Promise<ImageSection> {
        alert("Not implemented yet.")
        throw new Error("Method not implemented.");
    }
}

