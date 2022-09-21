class CreateHtmlElements {

    //* if adding more than one class to an element, please seperate using a dot/period (.)
    constructor(obj) {
        /* #region  Håndter hvilken html element der skal laves  */
        this.obj = obj;

        
        //* Hvis ingen type er angivet, lav en div.
        this.elementType = this.obj.type == "" ? "div" : this.obj.type;
        
        //* Gem resultatet af ovenstående shorthand if, i objektets egenskab "type".
        this.obj.type = this.elementType;
        /* #endregion */

        //*Assigns empty string value if class or id if the objects does not have one specified.
        if(this.obj.class == undefined){
            this.obj.class = "";
        }

        if(this.obj.id == undefined){
            this.obj.id = "";
        }



        //*Lav et html element og gem det i en miljø variable
        this.htmlElem = document.createElement(this.obj.type);
    }

    ApplyElementToParent(parent) {
        
        //* If id proerty is not empty, add the id to the element
        if (this.obj.id != "")
            this.htmlElem.id = this.obj.id;
        

        //* If class proerty is not empty, add the class to the element
        if (this.obj.class != ""){

            //* Handeling adding multiple classes to an html element
            let listOfClases = this.obj.class.split(".");

            //* If only one class then add that class
            if(listOfClases.length == 1){
                this.htmlElem.classList.add(this.obj.class);
            }
            //* If more than one, loop through length of array and add them all.
            else if (listOfClases.length > 1) {

                for(let i = 0; i < listOfClases.length; i++){
                    
                    this.htmlElem.classList.add(listOfClases[i]);                    
                }
            }
        }
        

        parent.appendChild(this.htmlElem);

        return this.htmlElem;
    }


}

export default CreateHtmlElements;