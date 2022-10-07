import CreateHtmlElements from "./CreateHtmlElements";
import content from "./ContentData.json";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import $ from "jquery";

class Navbar {

    constructor() {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

        //* Li elements get pushed in here on creation, array used in BurgerMenuToggle()
        this.listElements = [];

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
            type: "svg",
            id: "fa-Icon",
            class: "fa-solid.fa-bars"
        });

        this.burgerIcon.ApplyElementToParent(btnBurgerIcon.htmlElem);

        //*Function to create li->a with href and textnode
        this.CreateMenuPoints();

        $("#icon").on("click", function () {

            $(this).find('[data-fa-i2svg]').toggleClass("fa-xmark").toggleClass("fa-bars");

            // Hvis nav elementet kun har class="nav" skal class=responsive tilføjes 
            if (!$("#navList").prop('classList').contains("responsive")) {

                // Tilføj responsive class, da den ikke har den i forvejen.
                $("#navList").prop('classList').add("responsive");

                //Looper gennem array med li elementer og sætter display:block på dem alle sammen
                // this.listElements.forEach(item => {
                //     item.style.display = "block";
                // })
                $("#navList li").each((index, item) => {
                    item.style.display = "block";
                })
            }
            else {

                //Fjern responsive class, da den har den i forvejen
                $("#navList").prop('classList').remove("responsive");

                //Looper gennem array med li elementer og sætter display:none på dem alle sammen
                // this.listElements.forEach(item => {
                //     item.style.display = "none";
                // })
                $("#navList li").each((index, item) => {
                    item.style.display = "none";
                })

            }
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
                    class: "navLinks.contentLinks"
                });
            }
            else {
                a = new CreateHtmlElements({
                    type: "a",
                    id: "",
                    class: "navLinkFuture.contentLinks"
                });
            }

            a.ApplyElementToParent(li.htmlElem);
            a.htmlElem.href = `#${this.contentData.liMenuPoints.href[i]}`;
            let node = document.createTextNode(this.contentData.liMenuPoints.title[i]);
            a.htmlElem.appendChild(node);
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

    HighlighMenuPoints() {
        const contentSections = gsap.utils.toArray(".content");
        const navLinks = gsap.utils.toArray(".contentLinks");

        contentSections.forEach((sec, i) => {
            let startPos;
            let endPos;

            //* First section should have a slightly different start position, so it highlights after the scrollTo has run.
            if (sec.id === "topContainer") {
                startPos = "-5px +=125px";
            }
            else {
                startPos = "top +=125px";
            }

            //* The end position of the bottom container should be different, to make it highlight onenterback after highlighting the footer.
            if (sec.id === "bottomContainer") {
                endPos = "+=25% +=200px";
            }
            else {
                endPos = "+=90% +=200px";
            }

            //* Create a scrolltrigger, foreach content container (topContainer, middleContainer, bottomContainer, mainFooter);
            ScrollTrigger.create({
                trigger: sec,
                start: startPos,
                end: endPos,

                //* When a sections scrolltrigger enters the trigger. Remove active for all sections, then add for the right section
                onEnter: () => {
                    navLinks.forEach((e) => {
                        e.classList.remove("active");
                    });
                    navLinks[i].classList.add("active");
                },

                //*Same happens here, but when a sections entersback, after it has left the trigger
                onEnterBack: () => {
                    navLinks.forEach((e) => {
                        e.classList.remove("active");
                    });
                    navLinks[i].classList.add("active");

                },
            });



            window.addEventListener("scroll", () => {

                if (window.scrollY >= 2143) {

                    navLinks.forEach((e) => {
                        e.classList.remove("active");
                    });
                    navLinks[3].classList.add("active");
                }
                //*Removing the active class for kontakt again, if the scrollbar has not reached near bottom.
                else {
                    navLinks[3].classList.remove("active");
                }




                //* Removing active class, when scrolling to the top og the page
                if (window.scrollY <= 25) {
                    navLinks.forEach((e) => {
                        e.classList.remove("active");
                    });
                }
            });


        })
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


}
export default Navbar;