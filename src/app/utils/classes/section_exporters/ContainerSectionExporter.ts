import { SectionExporter } from "./SectionExporter";
import { ContainerSection } from "../sections/ContainerSection";
import { SectionAdder } from "../adding_sections/SectionAdder";
import { ContainerDataType } from "../../../../nooble/api-objs/Section";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Les exportateurs de sections d'activités permettent de créer une section de conteneur à partir de ses données JSON

*/
export class ContainerSectionExporter extends SectionExporter<ContainerDataType, ContainerSection>
{
    constructor()
    {
        super("container", "Conteneur");
    }

    override exportDataToSection(data: ContainerDataType, section_types_map: SectionTypesMap)
    {

        // On commence par créer les enfants
        let children = [];

        for (let child_data of data.children)
        {
            // On crée un nouvel enfant en fonction de ses données
            children.push(section_types_map.export(child_data));
        }

        // On crée les nouvelles données
        let new_data = {
            is_horizontal: data.is_horizontal,
            is_wrapping: data.is_wrapping,
            children: children
        }

        return new ContainerSection(new_data, section_types_map.getSectionAdder());
    }

    override async createNew(section_types_map: SectionTypesMap): Promise<ContainerSection>
    {
        return new ContainerSection({
            is_horizontal: true,
            is_wrapping: false,
            children: []
        }, section_types_map.getSectionAdder());
    }
}