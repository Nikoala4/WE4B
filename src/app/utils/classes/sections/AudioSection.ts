import { Section } from "./Section";

/*

    Les sections audio permettent d'afficher un contenu audio.
    
    Le mode édition n'est pas encore implémenté. 

*/
export class AudioSection extends Section<string, string>
{
    constructor(data: string)
    {
        super("audio", data);
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
        let audio = document.createElement("audio");
        audio.src = this.src;
        audio.controls = true;

        audio.appendChild(document.createElement("span")).innerText = "Your browser is not compatible...";
        audio.appendChild(document.createElement("br"));
        audio.appendChild(document.createElement("span")).innerText = "Downlaod the video";

        let video_link = audio.appendChild(document.createElement("a"));
        video_link.innerText = "here";
        video_link.href = this.src;

        return audio;
    }

    override renderEditable()
    {
        let div = document.createElement("div");

        let audio = div.appendChild(document.createElement("audio"));
        audio.src = this.src;
        audio.controls = true;

        audio.appendChild(document.createElement("span")).innerText = "Your browser is not compatible...";
        audio.appendChild(document.createElement("br"));
        audio.appendChild(document.createElement("span")).innerText = "Downlaod the video";

        let video_link = audio.appendChild(document.createElement("a"));
        video_link.innerText = "here";
        video_link.href = this.src;

        let change_button = div.appendChild(document.createElement("button"));
        change_button.appendChild(document.createElement("img")).src = "/images/icons/upload.png";

        return div;
    }

    override exportToJsonData()
    {
        return this.src;
    }
}

