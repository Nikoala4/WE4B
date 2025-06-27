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

    override async createNew(section_types_map: SectionTypesMap): Promise<ActivitySection> {
        let newActivity = await section_types_map.getSectionAdder().promptNewActivityFile()

        if (newActivity === null) throw new ReferenceError();

        return new ActivitySection({
            id: newActivity.new_file,
            javascript: newActivity.javascript,
            editable_javascript: newActivity.editable_javascript,
            css: newActivity.css,
            arguments: newActivity.arguments
        })
    }
}

