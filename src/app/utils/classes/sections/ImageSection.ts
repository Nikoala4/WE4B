import { Section } from "./Section";

/*

    Les sections d'image permettent d'afficher une image dans le cours. 
    
    Le mode édition n'est pas encore implémenté. 

*/
export class ImageSection extends Section<string, string>
{
    constructor(data: string)
    {
        super("image", data);
    }

    get src()
    {
        return this.data;
    }

    set src(value)
    {
        this.data = value;
    }

    override render()
    {
        let img = document.createElement("img");
        img.src = this.src;
        return img;
    }

    override renderEditable()
    {
        let div = document.createElement("div");

        div.appendChild(document.createElement("img")).src = this.src;
        let change_button = div.appendChild(document.createElement("button"));
        change_button.appendChild(document.createElement("img")).src = "/images/icons/upload.png";

        return div;
    }

    override exportToJsonData()
    {
        return this.src;
    }
}

