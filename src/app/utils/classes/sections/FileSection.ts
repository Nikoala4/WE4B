import { Section } from "./Section";

/*

    Les sections de fichiers permettent de télécharger des fichiers depuis le cours. 
    En mode édition, les fichiers sont transmis vers le serveur.
    En mode lecture, les fichiers sont téléchargés depuis le web. 

*/

export interface FileSectionData {
    description: string
    src: string | null
    filename: string
}

export interface FileSectionDataOutput {
    description: string
    src: string
    filename: string
}

export class FileSection extends Section<FileSectionData, FileSectionDataOutput>
{
    private _changed_src: boolean;
    private _file?: File

    constructor(data: FileSectionData)
    {
        super("file", data);
        this._changed_src = false;
    }

    get description()
    {
        return this.data.description;
    }

    set description(value)
    {
        let data = this.data;
        data.description = value;
        this.data = data;
        this.notifyEvents("modified", {
            reason: "inner-modification",
            modification: "descritption",
            description:value
        }, false);
    }

    get src()
    {
        return this.data.src;
    }

    set src(value)
    {
        let data = this.data;
        data.src = value;
        this.data = data;
        this._changed_src = true;
        this.notifyEvents("modified", {
            reason: "inner-modification",
            modification: "src",
            src: value
        }, false);

    }

    get filename()
    {
        return this.data.filename;
    }

    set filename(value)
    {
        let data = this.data;
        data.filename = value;
        this.data = data;
        this.notifyEvents("modified", {
            reason: "inner-modification",
            modification: "filename",
            src: value
        }, false);
    }

    override render()
    {
        let div = document.createElement("div");
        let description = div.appendChild(document.createElement("p"));
        description.classList.add("file-description");
        description.innerText = this.description;

        let link = div.appendChild(document.createElement("a"));
        link.classList.add("file-button");
        link.href = this.src!;
        link.target = "_blank";

        link.appendChild(document.createElement("img")).src = "/images/icons/download.png"
        let name = document.createElement("span")
        link.append(name)
        name.classList.add("file-extension");
        name.textContent = this.filename;
        return div;
    }

    override renderEditable()
    {
        let div = document.createElement("div");
        let description = div.appendChild(document.createElement("input"));
        description.type = "text"
        description.classList.add("file-description");
        description.value = this.description;

        let upload_button = div.appendChild(document.createElement("button"));
        upload_button.classList.add("file-button");

        upload_button.appendChild(document.createElement("img")).src = "/images/icons/upload.png"
        let name = document.createElement("span")
        upload_button.append(name)
        name.classList.add("file-extension");
        name.textContent = this.filename;

        description.addEventListener("input", ()=>{
            this.description = description.value;
        })

        return div;
    }

    override async onSave() {
        if (this._changed_src){
            let data = await fetch("/file/new/"+this.filename,{
                method: "POST",
                body:this._file
            });
            if (data.status === 202) {
                let json_data = await data.json();
                this.src = "/file/" + json_data.file_id;
            }else{
                throw new Error(data.status.toString());
            }
        } else if (!this.src) {
            throw new Error("cannot save : file not uploaded");
        }
    }

    override exportToJsonData()
    {
        return {
            filename: this.filename,
            description: this.description,
            src: this.src!
        };
    }
}

