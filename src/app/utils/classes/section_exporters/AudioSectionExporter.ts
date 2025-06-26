import { SectionExporter } from "./SectionExporter";
import { AudioSection } from "../sections/AudioSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section audio à partir de ses données JSON

*/
export class AudioSectionExporter extends SectionExporter<string, AudioSection>
{
    constructor()
    {
        super("audio", "Audio");
    }

    override exportDataToSection(data: string, section_types_map: SectionTypesMap): AudioSection
    {
        return new AudioSection(data);
    }

    override async createNew(section_types_map: SectionTypesMap): Promise<AudioSection> {
        alert("Not implemented yet.")
        throw new Error("Method not implemented.");
    }
}

