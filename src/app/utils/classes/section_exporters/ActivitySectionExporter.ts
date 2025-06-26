import { SectionExporter } from "./SectionExporter";
import { ActivitySection, ActivitySectionData } from "../sections/ActivitySection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section d'activité à partir de ses données JSON

*/
export class ActivitySectionExporter extends SectionExporter<ActivitySectionData, ActivitySection>
{
    constructor()
    {
        super("activity", "Activité interactive");
    }

    override exportDataToSection(data: ActivitySectionData, section_types_map: SectionTypesMap): ActivitySection
    {
        return new ActivitySection(data);
    }

    override createNew(section_types_map: SectionTypesMap): Promise<ActivitySection> {
        alert("Not implemented yet.")
        throw new Error("Method not implemented.");
    }
}

