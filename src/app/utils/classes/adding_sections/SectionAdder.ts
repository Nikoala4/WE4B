import { MatDialog } from "@angular/material/dialog";
import { SectionExporter } from "../section_exporters/SectionExporter";
import { SectionTypesMap } from "../SectionTypesMap";
import { SelectAmongDialogComponent } from "../../../components/select-among-dialog/select-among-dialog.component";

/*

    Le SectionAdder permet de demander une nouvelle section, et retourne un exportateur de section. 

*/
export class SectionAdder
{
    private _types_map: SectionTypesMap;

    constructor(types_map: SectionTypesMap, private dialogs: MatDialog)
    {
        this._types_map = types_map; // types_map est un SectionTypesMap (voir dans /scripts/classes/SectionTypesMap.js)
    }

    get types_map()
    {
        return this._types_map;
    }

    /*

        Retourne l'exportateur à utiliser pour créer une nouvelle section. 

    */
    async promptNewSection(): Promise<SectionExporter<any, any> | null>
    {
        let promise = new Promise<SectionExporter<any, any> | null>((resolve, reject) => {
            this.dialogs.open(SelectAmongDialogComponent, {
                data: {
                    title: "Ajouter un section...",

                }
            }).afterClosed().subscribe({
                next: (result) => {
                    if (result != null)
                    {
                        resolve(this._types_map.getTypeExporterByType(result));
                    } else {
                        resolve(null);
                    }
                },
            })
        })

        return await promise;
    }

}

