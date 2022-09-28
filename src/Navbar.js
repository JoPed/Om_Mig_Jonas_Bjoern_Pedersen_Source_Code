import CreateHtmlElements from "./CreateHtmlElements";
import content from "./ContentData.json";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import $ from 'jquery';

class Navbar {

    constructor() {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

        this.listElements = [];

        this.scrollPos = "";

        this.getScroll;

        //* Reference the data in the json file.
        this.contentData = content;



        //* Create header
        this.header = new CreateHtmlElements({
            type: "header",
            id: "mainHeader",
            class: ""
        });
        this.header.ApplyElementToParent(document.body);

        //*Create img
        let img = new CreateHtmlElements({
            type: "img",
            id: "mainHeader__image",
            class: ""
        });

        //*Look in Content.js in function SetImgSrcAndAltText() for image source and alt text.
        Window.images.push(img.htmlElem);


        img.ApplyElementToParent(this.header.htmlElem);

        //* Create navbar
        let nav = new CreateHtmlElements({
            type: "navbar",
            id: "navbar",
            class: ""

        });
        nav.ApplyElementToParent(this.header.htmlElem);


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

        btnBurgerIcon.htmlElem.addEventListener("click", () => {
            this.BurgerMenuToggle();
        });

    }

    //* Create li elements, append to their parent (ul) and create textnode for it's content.
    CreateMenuPoints() {
        for (let i = 0; i < this.contentData.liMenuPoints.href.length; i++) {
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
            let a;
            if (i != 2) {
                a = new CreateHtmlElements({
                    type: "a",
                    id: "",
                    class: "navLinks.links"
                });
            }
            else {
                a = new CreateHtmlElements({
                    type: "a",
                    id: "",
                    class: "navLinkFuture.links"
                });
            }

            a.ApplyElementToParent(li.htmlElem);
            a.htmlElem.href = `#${this.contentData.liMenuPoints.href[i]}`;
            let node = document.createTextNode(this.contentData.liMenuPoints.title[i]);
            a.htmlElem.appendChild(node);

            // this.arrayOfA.push(a.htmlElem);
        }
    }

    HandleScrollingWithScrollTrigger(selector, scrollPosition) {
        let links = gsap.utils.toArray(selector);
        this.linkTargets = links.map(link => document.querySelector(link.getAttribute("href")));


        //* Get the returned value of GetScrollLookUp and store it in a variable.        
        let getScroll = this.GetScrollLookup(this.linkTargets, scrollPosition);


        links.forEach((link, i) => {
            let target = this.linkTargets[i];
            link.addEventListener("click", e => {
                
                //*Prevent default link behaviour
                e.preventDefault()

                gsap.to(window, {
                    duration: 5,
                    scrollTo: getScroll(target),
                    overwrite: "auto"
                });
            });
        });
    }


    //* Helper function from GSAP member on their forum.
    // https://greensock.com/forums/topic/34010-scrollto-problems-while-using-scrolltrigger/
    /*
    Returns a FUNCTION that you can feed an element to get its scroll position.
    - targets: selector text, element, or Array of elements 
    - position: defaults to "top top" but can be anything like "center center", "100px 80%", etc. Same format as "start" and "end" ScrollTrigger values.
    - containerAnimation: [optional] the horizontal scrolling tween/timeline. Must have an ease of "none"/"linear".
    */
    GetScrollLookup(targets, position, containerAnimation) {
        let triggers = gsap.utils.toArray(targets).map((el, i) => ScrollTrigger.create({
            trigger: el,
            start: position || "top top",
            refreshPriority: -10,
            containerAnimation: containerAnimation
        })),
            st = containerAnimation && containerAnimation.scrollTrigger;
        return target => {
            let t = gsap.utils.toArray(target)[0],
                i = triggers.length;
            while (i-- && triggers[i].trigger !== t) { };
            if (i < 0) {
                return console.warn("target not found", target);
            }
            return containerAnimation ? st.start + (triggers[i].start / containerAnimation.duration()) * (st.end - st.start) : triggers[i].start;
        };
    }

    BurgerMenuToggle() {

        // Hvis nav elementet kun har class="nav" skal class=responsive tilføjes 
        if (!this.ul.htmlElem.classList.contains("responsive")) {

            // Tilføj responsive class, da den ikke har den i forvejen.
            this.ul.htmlElem.classList.add("responsive");

            this.ChangeIcon();

            //Looper gennem array med li elementer og sætter display:block på dem alle sammen
            this.listElements.forEach(item => {
                item.style.display = "block";
            })
        }
        else {

            //Fjern responsive class, da den har den i forvejen
            this.ul.htmlElem.classList.remove("responsive");
            this.ChangeIcon();

            //Looper gennem array med li elementer og sætter display:none på dem alle sammen
            this.listElements.forEach(item => {
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
export default Navbar;