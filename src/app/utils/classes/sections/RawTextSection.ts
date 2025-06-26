import { Section } from "./Section";

/*

    Les sections de texte brut permettent d'afficher un texte brut dans le cours.
    
    Le mode édition n'est pas encore implémenté. 

*/
export class RawTextSection extends Section<string, string>
{
    constructor(data: string)
    {
        super("raw-text", data);
    }

    get text()
    {
        return this.data;
    }

    set text(value)
    {
        this.data = value;

        this.notifyEvents("modified", {
            new_text: value
        }, false);
    }

    override render()
    {
        let p = document.createElement("p");
        p.innerText = this.text;
        return p;
    }

    override renderEditable()
    {
        let div = document.createElement("div");

        div.contentEditable = true.toString();
        div.innerText = this.text;

        div.addEventListener("input", () => {
            let text = div.innerText;

            while (text.endsWith("\n")) text = text.substring(0, text.length - 1)

            this.text = text;
        });

        return div;
    }

    override exportToJsonData()
    {
        return this.text;
    }
}

