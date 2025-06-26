import { SectionExporter } from "./SectionExporter";
import { VideoSection } from "../sections/VideoSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section vidéo à partir de ses données JSON

*/
export class VideoSectionExporter extends SectionExporter<string, VideoSection>
{
    constructor()
    {
        super("video", "Vidéo");
    }

    exportDataToSection(data: string, section_types_map: SectionTypesMap): VideoSection
    {
        return new VideoSection(data);
    }

    override createNew(section_types_map: SectionTypesMap): Promise<VideoSection> {
        alert("Not implemented yet.")
        throw new Error("Method not implemented.");
    }
}

