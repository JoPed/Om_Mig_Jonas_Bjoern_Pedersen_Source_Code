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

        img.elem.src = "../assets/img/pc/JonasBjørnPedersen_pc.jpg";

        img.ApplyElementToParent(header.elem);

        //* Create navbar
        let nav = new CreateHtmlElements({
            type: "navbar",
            id: "navbar",
            class: ""

        });
        nav.ApplyElementToParent(header.elem);


        //*Create ul
        this.ul = new CreateHtmlElements({
            type: "ul",
            id: "navList",
            class: ""
        });
        this.ul.ApplyElementToParent(nav.elem);

        //* Create burger menu Icon
        let btnBurgerIcon = new CreateHtmlElements({
            type: "button",
            id: "icon",
            class: ""
        });

        

        btnBurgerIcon.ApplyElementToParent(nav.elem);

        //* if/when adding more than one class to an element, please seperate using a dot/period (.)
        this.burgerIcon = new CreateHtmlElements({
            type: "i",
            id: "fa-Icon", 
            class: "fa-solid.fa-bars"
        });

        this.burgerIcon.ApplyElementToParent(btnBurgerIcon.elem);


        //*Function to create li->a with href and textnode
        this.CreateMenuPoints();

        // let handleMenu = new Navigation(this.ul, this.listElements, burgerIcon);

        btnBurgerIcon.elem.addEventListener("click", () => {
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
            li.ApplyElementToParent(this.ul.elem);

            this.listElements.push(li.elem);

            //*Creating an a element with href, and applying them to the li's with a textnode
            let a = new CreateHtmlElements({
                type: "a",
                id: "",
                class: "navLinks"
            });

            a.ApplyElementToParent(li.elem);
            a.elem.href = `#${this.contentData.liMenuPoints.href[i]}`;
            let node = document.createTextNode(this.contentData.liMenuPoints.title[i]);
            a.elem.appendChild(node);
        }
    }

    BurgerMenuToggle() {

        // Hvis nav elementet kun har class="nav" skal class=responsive tilføjes 
        if (!this.ul.elem.classList.contains("responsive")) {
    
            // Tilføj responsive class, da den ikke har den i forvejen.
            this.ul.elem.classList.add("responsive");

            this.ChangeIcon();

            //Looper gennem array med li elementer og sætter display:block på dem alle sammen
            this.listElements.forEach( item => {
                item.style.display = "block";
            })


        }
        else {
    
            //Fjern responsive class, da den har den i forvejen
            this.ul.elem.classList.remove("responsive");
            this.ChangeIcon();
    
            //Looper gennem array med li elementer og sætter display:none på dem alle sammen
            this.listElements.forEach( item => {
                item.style.display = "none";
            })
    
        }
    }

    ChangeIcon() {
        // Hvis ikonet (i elementet) inde i knappen har en klass fa-bars (de streg menu streger)
        if (this.burgerIcon.elem.classList.contains("fa-bars")) {
    
            // Erstat menu bar ikon med xmark 
            this.burgerIcon.elem.classList.replace("fa-bars", "fa-xmark");
        }
        else {
            // Erstat xmark ikon med menu bar 
            this.burgerIcon.elem.classList.replace("fa-xmark", "fa-bars");
    
        }
    }


}
export default CreateNavbar;