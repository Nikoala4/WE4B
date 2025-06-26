import { CssParser } from "../../css-integration/CssParser";
import { Section } from "./Section";

/*

    Les sections d'activité permettent d'envoyer du contenu intéractif dans le cours. 

    Côté serveur, elles peuvent définir leur propre controller, et indiquent également un
    contenu HTML, Javascript et CSS à inclure dans le cours. 

    Côte client, on peut définir les activités comme un simple contenu intégré dans le cours, mais
    de la même manière qu'un "sous-site". 

*/

export interface ActivitySectionData {
    javascript: string
    editable_javascript: string
    css: string
    id: string
}

export class ActivitySection extends Section<ActivitySectionData, {file_id: string}>
{
    private _activity: any;
    private _editable_activity: any;

    constructor(data: ActivitySectionData)
    {
        super("activity", data);

        let activity;

        // préparation du code javascript en mode lecture (voir Activity::getJavascript dans src/CustomeFeatures/Activity.php)
        eval(data.javascript + '\n\nactivity = new Activity(data.id, data.arguments)');
        
        this._activity = activity;

        // préparation du code javascript en mode lecture (voir Activity::getEditableJavascript dans src/CustomeFeatures/Activity.php)
        eval(data.editable_javascript + '\n\nactivity = new Activity(data.id, data.arguments)');
        
        this._editable_activity = activity;
    }

    get id()
    {
        return this.data.id;
    }

    get css()
    {
        return this.data.css;
    }

    get javascript()
    {
        return this.data.javascript;
    }

    get editable_javascript()
    {
        return this.data.editable_javascript;
    }

    override render(): HTMLDivElement
    {
        let div = document.createElement("div");
        div.id = "activity-integration-" + this.id;

        let parser = new CssParser(); // permet d'encapsuler le CSS

        let style = div.appendChild(document.createElement("style"));
        style.innerHTML = parser.parse("#" + div.id, this.css); // permet d'encapsuler le CSS

        this._activity.onRender(div);

        return div;
    }

    override renderEditable(): HTMLDivElement
    {
        let div = document.createElement("div");
        div.id = "activity-integration-" + this.id;

        let parser = new CssParser(); // permet d'encapsuler le CSS

        let style = div.appendChild(document.createElement("style"));
        style.innerHTML = parser.parse("#" + div.id, this.css); // permet d'encapsuler le CSS

        this._editable_activity.onRender(div);

        return div;
    }

    /*

        On NE DOIT PAS exporter le contenu HTML, Javascript et CSS, bien qu'ils soient indiqués en entrée. 
        En effet, ils sont directement définis par le serveur au moment de l'envoi. 
        On n'a besoin que de l'identifiant du cours. 

    */
    override exportToJsonData()
    {
        return {
            file_id: this.id
        };
    }
}

