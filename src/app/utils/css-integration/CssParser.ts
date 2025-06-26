/*

    Cette classe vise à encapsuler les règles CSS afin qu'elles restent dans une div spécifique.

    Elle est divisée en plusieurs parties :

    - une partie qui divise les règles ;
    - une partie qui analyse et scinde les règles CSS (y compris les règles multimédias, etc.)
    - une partie qui lit simplement les règles CSS et applique à chaque règle le parent CSS d'encapsulation.

*/


export class CssParser
{
    constructor()
    {

    }

    _split_content(data: string)
    {
        while (data.endsWith(" "))
            data = data.substring(0, data.length-1);

        if (data === "") return [];
        else return [data];
    }

    _split_css(data: string)
    {
        data = data.replaceAll("\n", " ").replaceAll("\t", " ");

        while (data.includes("  ")) data = data.replaceAll("  ", " ");

        let result: any = [""]; // recursive type
        let brackets = 0;

        let intermediate_data: string;
        let inside_comment = false;

        for (let i = 0; i < data.length; ++i)
        {
            let char = data[i];

            if (inside_comment)
            {
                if (char === "*" && data[i+1] === "/")
                {
                    inside_comment = false;
                    i += 1;
                }
                continue;
            } else if (char === "/" && data[i+1] === "*") {
                inside_comment = true;
                i += 1;
                continue;
            }

            if (brackets === 0)
            {
                if (char === " ")
                {
                    if (result[result.length - 1].length)
                    {
                        result[result.length - 1] += " ";
                    } else {
                        continue;
                    }
                } else if (char === "{"){
                    intermediate_data = "";
                    brackets += 1;
                } else {
                    result[result.length - 1] += char;
                }
            } else {
                if (char === " ")
                {
                    if (intermediate_data!.length)
                    {
                        intermediate_data! += " ";
                    } else {
                        continue;
                    }
                } else if (char === "{") {
                    brackets += 1;
                    intermediate_data! += "{";
                } else if (char === "}") {
                    brackets -= 1;

                    if (brackets === 0)
                    {
                        while (result[result.length - 1].endsWith(" ")) result[result.length -1] = result[result.length - 1].substring(0, result[result.length - 1].length - 1);

                        if (result[result.length - 1].startsWith("@media"))
                        {
                            result.push(this._split_css(intermediate_data!));
                        } else {
                            result.push(this._split_content(intermediate_data!));
                        }

                        result.push("");
                    } else {
                        intermediate_data! += "}";
                    }
                } else {
                    intermediate_data! += char;
                }
            }
        }

        while (result[result.length-1] === "") result.splice(-1);
        while (result[result.length-1] && result[result.length-1].constructor === String && result[result.length-1].endsWith(" ")) result[result.length-1] = result[result.length-1].substring(0, result[result.length-1].length-1);

        return result;
    }

    _parseSplitted(name: string, splitted: any)
    {
        let result = "";

        let terminal = true;
        for (let element of splitted)
        {
            if (element.constructor === Array)
            {
                terminal = false;
            }
        }

        for (let element of splitted)
        {
            if (element.constructor === Array)
            {
                if (element.length > 0) result += " {\n  " + this._parseSplitted(name, element).replaceAll("\n", "\n  ") + "\n}\n\n";
                else result += " { /* this style is empty */}\n"
            } else {
                if (element.startsWith("@")) {
                    result += element;
                } else if (terminal) {
                    result += element + "\n";
                } else {
                    let i = 0;

                    for (let rule_element of element.split(","))
                    {
                        if (i !== 0) result += ", ";
                        result += name + " " + rule_element ;
                        ++i;
                    }
                }
            }
        }

        return result;

    }

    /*

        Exécuter:
        >> let specific_style = parse('#div', 'p {color:red}\n\nh1 {color: blue}'); // 

        pour appliquer le style uniquement à la division "#div" :
        
            #div p {color:red}\n\n#div h1 {color: blue}

    */
    parse(name: string, data: string)
    {
        let splitted = this._split_css(data);

        return this._parseSplitted(name, splitted);
    }
}