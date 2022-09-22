import CreateHtmlElements from "./CreateHtmlElements";
import content from "./ContentData.json";

class CreateNavbar{

    constructor(){

        this.listElements = [];

        //* Reference the data in the json file.
        this.contentData = content;      

        
        
        //* Create header
        let header = new CreateHtmlElements({
            type: "header",
            id: "mainHeader",
            class: ""
        });
        header.ApplyElementToParent(document.body);
        
        //*Create img
        let img = new CreateHtmlElements({
            type: "img",
            id: "mainHeader__image",
            class: ""
        });
        
        //*Look in Content.js in function SetImgSrcAndAltText() for image source and alt text.
        Window.images.push(img.htmlElem);
        

        img.ApplyElementToParent(header.htmlElem);

        //* Create navbar
        let nav = new CreateHtmlElements({
            type: "navbar",
            id: "navbar",
            class: ""

        });
        nav.ApplyElementToParent(header.htmlElem);


        //*Create ul
        this.ul = new CreateHtmlElements({
            type: "ul",
            id: "navList",
            class: ""
        });
        this.ul.ApplyElementToParent(nav.htmlElem);

        //* Create burger menu Icon
        let btnBurgerIcon = new CreateHtmlElements({
            type: "button",
            id: "icon",
            class: ""
        });

        

        btnBurgerIcon.ApplyElementToParent(nav.htmlElem);

        //* if/when adding more than one class to an element, please seperate using a dot/period (.)
        this.burgerIcon = new CreateHtmlElements({
            type: "i",
            id: "fa-Icon", 
            class: "fa-solid.fa-bars"
        });

        this.burgerIcon.ApplyElementToParent(btnBurgerIcon.htmlElem);


        //*Function to create li->a with href and textnode
        this.CreateMenuPoints();

        // let handleMenu = new Navigation(this.ul, this.listElements, burgerIcon);

        btnBurgerIcon.htmlElem.addEventListener("click", () => {
            this.BurgerMenuToggle();
        });

    }

    //* Create li elements, append to their parent (ul) and create textnode for it's content.
    CreateMenuPoints(){
        for(let i = 0; i < this.contentData.liMenuPoints.href.length; i++){
            let li = new CreateHtmlElements({
                type: "li",
                id: "",
                class: ""
            });   
            
            //* using this method to append the li, to the ul.
            li.ApplyElementToParent(this.ul.htmlElem);

            //* Array bruges i BurgerMenuToogle()
            this.listElements.push(li.htmlElem);

            //*Creating an a element with href, and applying them to the li's with a textnode
            let a = new CreateHtmlElements({
                type: "a",
                id: "",
                class: "navLinks"
            });

            a.ApplyElementToParent(li.htmlElem);
            a.htmlElem.href = `#${this.contentData.liMenuPoints.href[i]}`;
            let node = document.createTextNode(this.contentData.liMenuPoints.title[i]);
            a.htmlElem.appendChild(node);
        }
    }

    BurgerMenuToggle() {

        // Hvis nav elementet kun har class="nav" skal class=responsive tilføjes 
        if (!this.ul.htmlElem.classList.contains("responsive")) {
    
            // Tilføj responsive class, da den ikke har den i forvejen.
            this.ul.htmlElem.classList.add("responsive");

            this.ChangeIcon();

            //Looper gennem array med li elementer og sætter display:block på dem alle sammen
            this.listElements.forEach( item => {
                item.style.display = "block";
            })


        }
        else {
    
            //Fjern responsive class, da den har den i forvejen
            this.ul.htmlElem.classList.remove("responsive");
            this.ChangeIcon();
    
            //Looper gennem array med li elementer og sætter display:none på dem alle sammen
            this.listElements.forEach( item => {
                item.style.display = "none";
            })
    
        }
    }

    ChangeIcon() {
        // Hvis ikonet (i elementet) inde i knappen har en klass fa-bars (de streg menu streger)
        if (this.burgerIcon.htmlElem.classList.contains("fa-bars")) {
    
            // Erstat menu bar ikon med xmark 
            this.burgerIcon.htmlElem.classList.replace("fa-bars", "fa-xmark");
        }
        else {
            // Erstat xmark ikon med menu bar 
            this.burgerIcon.htmlElem.classList.replace("fa-xmark", "fa-bars");
    
        }
    }


}
export default CreateNavbar;