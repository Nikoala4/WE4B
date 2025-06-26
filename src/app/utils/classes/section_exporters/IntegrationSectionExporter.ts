import { SectionExporter } from "./SectionExporter";
import { IntegrationSection, IntegrationSectionData } from "../sections/IntegrationSection";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section d'intégration à partir de ses données JSON

*/
export class IntegrationSectionExporter extends SectionExporter<IntegrationSectionData, IntegrationSection>
{
    constructor()
    {
        super("integration", "Intégration");
    }

    override exportDataToSection(data: IntegrationSectionData, section_types_map: SectionTypesMap): IntegrationSection
    {
        return new IntegrationSection(data);
    }

    override createNew(section_types_map: SectionTypesMap): Promise<IntegrationSection> {
        alert("Not implemented yet.")
        throw new Error("Method not implemented.");
    }
}

