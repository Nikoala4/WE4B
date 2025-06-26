import { Section } from "../sections/Section";
import { SectionTypesMap } from "../SectionTypesMap";

/*

    Un exportateur de section permettre de transformer les données JSON en un objet Section (voir le dossier Section.js), 

*/
export abstract class SectionExporter<InputDataType, ResultingSection extends Section<any, any>>
{
    private _type: string
    private _name: string

    constructor(type: string, name: string)
    {
        this._type = type;
        this._name = name;
    }

    get type()
    {
        return this._type;
    }

    get name()
    {
        return this._name;
    }

    /*

        Cette méthode permet d'exporter des données JSON en une section

    */
    abstract exportDataToSection(data: InputDataType, section_types_map: SectionTypesMap): Section<any, any>;

    /*

        Cette méthode permet de créer une nouvelle section à partir de rien

    */
    abstract createNew(section_types_map: SectionTypesMap): Promise<ResultingSection>;

}
