import content from "./ContentData.json";

class CreateHtmlElements {

    constructor(obj) {

        /* #region  Håndter hvilken html element der skal laves  */
        this.obj = obj;

        this.content = content;


        //* Hvis ingen type er angivet, lav en div.
        this.elementType = this.obj.type == "" ? "div" : this.obj.type;

        //* Gem resultatet af ovenstående shorthand if, i objektets egenskab "type".
        this.obj.type = this.elementType;
        /* #endregion */



    }

    ApplyElementToParent(parent) {

        //*Lav et html element og gem det i en miljø variable
        this.elem = document.createElement(this.obj.type);

        if (this.obj.id != "")
            this.elem.id = this.obj.id;


        if (this.obj.class != "")
            this.elem.class = this.obj.class;




        parent.appendChild(this.elem);

        return this.elem;
    }


}

export default CreateHtmlElements;