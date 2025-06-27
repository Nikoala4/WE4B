import { MatDialog } from "@angular/material/dialog";
import { SectionExporter } from "../section_exporters/SectionExporter";
import { SectionTypesMap } from "../SectionTypesMap";
import { SelectAmongDialogComponent } from "../../../components/select-among-dialog/select-among-dialog.component";
import { ApiService } from "../../../services/api.service";
import { ApiActivityFileInitializationResponse } from "../../../../nooble/api-comm/ActivityFileInitializationResponse";

/*

    Le SectionAdder permet de demander une nouvelle section, et retourne un exportateur de section. 

*/
export class SectionAdder
{
    private _types_map: SectionTypesMap;

    constructor(types_map: SectionTypesMap, private dialogs: MatDialog, private apiService: ApiService)
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
                    selectionList: this._types_map.getExporterTypes().map((type) => ({
                        name: type,
                        url: "/images/sections/" + type + ".png"
                    }))
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

    async promptNewActivityFile(): Promise<ApiActivityFileInitializationResponse | null>
    {
        return await new Promise((resolve, reject) => {
            this.apiService.activities.listExistingActivities().subscribe({
                next: (list) => {
                    this.dialogs.open(SelectAmongDialogComponent, {
                        data: {
                            title: "Ajouter un section...",
                            selectionList: list.map((name) => ({
                                name: name,
                                url: "/images/activities/" + name + ".png"
                            }))
                        }
                    }).afterClosed().subscribe({
                        next: (result) => {
                            if (result === null)
                            {
                                resolve(null);
                            } else {
                                this.apiService.activities.initActivity(result).subscribe({
                                    next: (fileResult) => {
                                        resolve(fileResult);
                                    }
                                })
                            }
                        },
                    })
                }
            })
        })
    }

}

