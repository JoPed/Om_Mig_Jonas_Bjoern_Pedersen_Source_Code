import CreateHtmlElements from "./CreateHtmlElements";
import content from "./ContentData.json";

class CreateNavbar{

    constructor(){

        //* Reference the data in the json file.
        this.contentData = content;

        //* Create header
        let header = new CreateHtmlElements({
            type: "header",
            id: "mainHeader",
            class: "",
            hasTextContent: false
        }).ApplyElementToParent(document.body);

        //* Create navbar
        let nav = new CreateHtmlElements({
            type: "navbar",
            id: "nav",
            class: "",
            hasTextContent: false

        }).ApplyElementToParent(header);

        //*Create ul
        this.ul = new CreateHtmlElements({
            type: "ul",
            id: "navList",
            class: "",
            hasTextContent: false
        }).ApplyElementToParent(nav);


        this.createMenuPoints();

    }

    //* Create li elements, append to their parent (ul) and create textnode for it's content.
    createMenuPoints(){
        for(let i = 0; i < this.contentData.liMenuPoints.length; i++){
            let li = new CreateHtmlElements({
                type: "li",
                id: "",
                class: "",
                hasTextContent: true
            });       
            
            li.ApplyElementToParent(this.ul);


            let node = document.createTextNode(this.contentData.liMenuPoints[i]);

            li.elem.appendChild(node);
        }
    }
}
export default CreateNavbar;