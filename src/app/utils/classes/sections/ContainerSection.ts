import { ContainerDataType } from "../../../../nooble/api-objs/Section";
import { SectionAdder } from "../adding_sections/SectionAdder";
import { Section } from "./Section";

/*

    Les sections conteneurs permettent d'afficher d'autres sections, de manière
    horizontales ou verticales, avec ou sans retour à la ligne. 

*/

export interface ContainerSectionInputData {
    is_horizontal: boolean
    is_wrapping: boolean
    children: Section<any, any>[]
}

export class ContainerSection extends Section<ContainerSectionInputData, ContainerDataType>
{
    private _section_adder: SectionAdder

    constructor(data: ContainerSectionInputData, section_adder: SectionAdder)
    {
        super("container", data);

        // Cette étape permet d'être notifié des évènements des enfants, et de les renvoyés à l'élément parent.
        for (let child of this.children)
        {
            child.addEventListener("modified", (event: any) => {
                this.notifyEvents("modified", {
                    reason: 'child-modification',
                    child: child,
                    event: event
                }, event.detail.requires_reload)
            });
        }

        // Le SectionAdder permet d'ouvrir une fenêtre d'invite pour choisir une section à rajouter. 
        this._section_adder = section_adder;
    }

    get is_horizontal()
    {
        return this.data.is_horizontal;
    }

    get is_wrapping()
    {
        return this.data.is_wrapping;
    }

    get children()
    {
        return this.data.children;
    }

    /*

        Changer l'orientation du conteneur

    */
    set is_horizontal(enabled)
    {
        let data = this.data;
        data.is_horizontal = enabled;
        this.data = data;

        this.notifyEvents("modified", {
            reason: 'inner-modification',
            modification: 'direction',
            horizontal: enabled
        }, true);
    }

    /*

        Changer le retour à la ligne du conteneur

    */
    set is_wrapping(enabled)
    {
        let data = this.data;
        data.is_wrapping = enabled;
        this.data = data;

        this.notifyEvents("modified", {
            reason: 'inner-modification',
            modification: 'wrapping',
            wraps: enabled
        }, true);
    }

    /*

        Ajouter un conteneur aux enfants

    */
    addChild(child: Section<any, any>)
    {
        this.data.children.push(child);

        child.addEventListener("modified", (event: any) => {
            this.notifyEvents("modified", {
                reason: 'child-modification',
                child: child,
                event: event
            }, event.detail.requires_reload)
        });

        this.notifyEvents("modified", {
            reason: 'children-addition',
            new_child: child
        }, true);
    }

    /*

        Retirer un enfant au conteneur

    */
    removeChild(index: number)
    {
        let child = this.data.children.splice(index, 1)[0];

        this.notifyEvents("modified", {
            reason: 'children-removal',
            child_index: index,
            child: child
        }, true);
    }

    /*

        Déplacer un enfant vers le haut

    */
    moveChildToPrevious(index: number)
    {
        let child = this.children[index-1];

        this.children[index - 1] = this.children[index];
        this.children[index] = child;

        this.notifyEvents("modified", {
            reason: 'children-move',
            child_index: index,
            child: child
        }, true);
    }

    /*

        Déplacer un enfant vers le bas

    */
    moveChildToNext(index: number)
    {
        let child = this.children[index];

        this.children[index] = this.children[index + 1];
        this.children[index + 1] = child;

        this.notifyEvents("modified", {
            reason: 'children-move',
            child_index: index,
            child: child
        }, true);
    }

    override render()
    {
        let div = document.createElement("div");

        if (this.is_horizontal)
        {
            div.classList.add("horizontal-section-container");
        }

        if (this.is_wrapping)
        {
            div.classList.add("wrapping-section-container");
        }

        for (let child of this.children)
        {
            div.appendChild(child.htmlElement);
        }

        return div;
    }

    override renderEditable()
    {
        let div = document.createElement("div");

        if (this.is_horizontal)
        {
            div.classList.add("horizontal-section-container");
        }

        if (this.is_wrapping)
        {
            div.classList.add("wrapping-section-container");
        }
    
        let start_edit_buttons_actions = div.appendChild(document.createElement("div"));
        start_edit_buttons_actions.classList.add("edit-container-buttons-actions");

        let direction_button = start_edit_buttons_actions.appendChild(document.createElement("button"));
        direction_button.classList.add("edit-content-action", "icon-button");
        direction_button.addEventListener("click", () => {
            this.is_horizontal = !this.is_horizontal;
        });

        let direction_button_image = direction_button.appendChild(document.createElement("img"));

        if (this.is_horizontal)
        {
            direction_button.classList.add("edit-content-vertical");
            direction_button_image.src = "/images/icons/vertical.png";
        } else {
            direction_button.classList.add("edit-content-horizontal");
            direction_button_image.src = "/images/icons/horizontal.png";
        }

        let wrap_button = start_edit_buttons_actions.appendChild(document.createElement("button"));
        wrap_button.classList.add("edit-content-action", "icon-button");
        wrap_button.addEventListener("click", () => {
            this.is_wrapping = !this.is_wrapping;
        });

        let wrap_button_image = wrap_button.appendChild(document.createElement("img"));

        if (this.is_wrapping)
        {
            wrap_button.classList.add("edit-content-nowrap");
            wrap_button_image.src = "/images/icons/nowrap.png";
        } else {
            wrap_button.classList.add("edit-content-wrap");
            wrap_button_image.src = "/images/icons/wrap.png";
        }

        let editable_div = div.appendChild(document.createElement("div"));
        editable_div.classList.add("container-editable-content");

        let child_index = 0;
        
        for (let child of this.children)
        {
            let local_child_index = child_index; // Remember the child index for further operation

            let innerdiv = editable_div.appendChild(document.createElement("div"));
            innerdiv.classList.add("edit-content-section");

            let element_edit_buttons_actions = innerdiv.appendChild(document.createElement("div"));
            element_edit_buttons_actions.classList.add("edit-content-buttons-actions");

            let remove_button = element_edit_buttons_actions.appendChild(document.createElement("button"));
            remove_button.classList.add("edit-content-action", "edit-content-remove-line", "icon-button");
            remove_button.addEventListener("click", () => {
                this.removeChild(local_child_index);
            })
    
            let remove_button_image = remove_button.appendChild(document.createElement("img"));
            remove_button_image.src = "/images/icons/close.png";
        
            let move_previous_button = element_edit_buttons_actions.appendChild(document.createElement("button"));
            move_previous_button.classList.add("edit-content-action", "edit-content-remove-line", "icon-button");
            move_previous_button.addEventListener("click", () => {
                this.moveChildToPrevious(local_child_index);
            })
    
            let move_previous_button_image = move_previous_button.appendChild(document.createElement("img"));

            if (this.is_horizontal)
                move_previous_button_image.src = "/images/icons/left.png";
            else
                move_previous_button_image.src = "/images/icons/up.png";
        
            let move_next_button = element_edit_buttons_actions.appendChild(document.createElement("button"));
            move_next_button.classList.add("edit-content-action", "edit-content-remove-line", "icon-button");
            move_next_button.addEventListener("click", () => {
                this.moveChildToNext(local_child_index);
            })
    
            let move_next_button_image = move_next_button.appendChild(document.createElement("img"));

            if (this.is_horizontal)
                move_next_button_image.src = "/images/icons/right.png";
            else
                move_next_button_image.src = "/images/icons/down.png";

            if (child_index === 0)
            {
                move_previous_button.classList.add("disabled-button");
            } 

            if (child_index === this.children.length -1)
            {
                move_next_button.classList.add("disabled-button");
            }
        
            innerdiv.appendChild(child.editableHtmlElement);

            ++child_index;
        }

        let end_edit_buttons_actions = div.appendChild(document.createElement("div"));
        end_edit_buttons_actions.classList.add("edit-container-buttons-actions");

        let add_button = end_edit_buttons_actions.appendChild(document.createElement("button"));
        add_button.classList.add("edit-content-action", "edit-content-remove-line", "icon-button");
        add_button.addEventListener("click", () => {
            this.addElement();
        });

        let add_button_image = add_button.appendChild(document.createElement("img"));
        add_button_image.src = "/images/icons/add.png";
    
        return div;
    }

    override async onSave()
    {
        for (let child of this.children){
            await child.onSave();
        }
    }
    
    override exportToJsonData()
    {
        return {
            is_horizontal: this.is_horizontal,
            is_wrapping: this.is_wrapping,
            children: this.children.map((child) => child.json_data)
        };
    }

    /*

        Créer un nouvel élément

    */
    async addElement()
    {
        let exporter = await this._section_adder.promptNewSection()

        if (exporter !== null)
        {
            let element;
            try {
                element = await exporter!.createNew(this._section_adder.types_map);
            } catch (exc) {
                throw exc;
            }

            this.addChild(element);
        }
    }


}


