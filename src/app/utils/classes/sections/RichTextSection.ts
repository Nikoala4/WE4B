import { Section } from "./Section";

/*

    Les sections de texte riche permettent d'afficher un texte riche. 
    
    Le mode édition n'est pas encore implémenté. 

*/
export class RichTextSection extends Section<string, string>
{
    constructor(data: string)
    {
        super("rich-text", data);
    }

    get content()
    {
        return this.data;
    }

    set content(value)
    {
        this.data = value;
    }

    override render()
    {
        let div = document.createElement("p");
        div.innerHTML = this.content;
        return div;
    }

    override renderEditable()
    {
        let div = document.createElement("div");

        let edit_line_div = div.appendChild(document.createElement("div"));
        edit_line_div.classList.add("rich-text-section-edit-line")
        for (let icon_name of ["bold", "italic", "underlined", "preformat", "list", "enumeration", "link"])
        {
            let action_button = edit_line_div.appendChild(document.createElement("button"));
            action_button.classList.add("icon-button");
            action_button.appendChild(document.createElement("img")).src = "/images/icons/" + icon_name + ".png";
        }

        let edit_div = div.appendChild(document.createElement("div"));
        edit_div.classList.add("rich-text-section-content");
        edit_div.contentEditable = true.toString();

        edit_div.innerHTML = this.content;

        return div;
    }

    override exportToJsonData()
    {
        return this.content;
    }
}

