import { Section } from "./Section";


/*

    Les sections d'intégration permettent d'intégrer une page via son URL d'intégration. 
    
    Le mode édition n'est pas encore implémenté. 

*/

export interface IntegrationSectionData {
    width: string|number
    height: string|number
    src: string
    permissions: string[]
}

export class IntegrationSection extends Section<IntegrationSectionData, IntegrationSectionData>
{
    constructor(data: IntegrationSectionData)
    {
        super("integration", data);
    }

    get width()
    {
        return this.data.width;
    }

    get height()
    {
        return this.data.height;
    }

    get src()
    {
        return this.data.src;
    }

    get permissions()
    {
        return this.data.permissions;
    }

    override render()
    {
        let frame = document.createElement("iframe");
        frame.width = this.width.toString();
        frame.height = this.height.toString();
        frame.src = this.src

        let permissions = ""
        for (let permission of this.permissions)
        {
            if (permission === "fullscreen")
            {
                frame.allowFullscreen = true;
            } else {
                if (permissions !== "")
                {
                    permissions += "; "
                }
    
                permissions += permission;
            }
        }

        frame.allow = permissions;
        frame.setAttribute("frameBorder", "0");
        frame.loading = "lazy";

        return frame;
    }

    override renderEditable(): HTMLElement {
        return this.render();
    }

    override exportToJsonData(): IntegrationSectionData
    {
        return {
            width: this.width,
            height: this.height,
            src: this.src,
            permissions: this.permissions
        };
    }
}

