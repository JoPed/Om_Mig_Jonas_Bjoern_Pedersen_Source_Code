import content from "./ContentData.json";
import CreateHtmlElements from "./CreateHtmlElements";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

class Content {
    constructor() {

        gsap.registerPlugin(ScrollTrigger);

        //* Reference the json data.
        this.content = content;

        //* Creating main container
        this.mainContainer = new CreateHtmlElements({
            type: "main",
            id: "mainContent",
            class: ""
        });

        this.mainContainer.ApplyElementToParent(document.body);

        /* #region  Container 1 */
        //* Create first section
        this.topContainer = new CreateHtmlElements({
            type: "div",
            id: "topContainer",
            class: ""
        });

        this.topContainer.ApplyElementToParent(this.mainContainer.elem);

        //* Inputting content i first section
        let welcomeArticle = new CreateHtmlElements({

            type: "article",
            id: "welcomeArticle",
            class: ""
        });

        welcomeArticle.ApplyElementToParent(this.topContainer.elem);

        let welcomeHeading = new CreateHtmlElements({
            type: "h1",
            id: "",
            class: ""
        });

        let text = new CreateHtmlElements({
            type: "p",
            id: "",
            class: ""
        });

        welcomeHeading.ApplyElementToParent(welcomeArticle.elem);
        text.ApplyElementToParent(welcomeArticle.elem);

        let welcomeImg = new CreateHtmlElements({
            type: "img",
            id: "welcomeImg",
            class: ""
        });

        welcomeImg.elem.src = this.content.imageSources.pc[1];

        welcomeImg.ApplyElementToParent(welcomeArticle.elem);

        gsap.to(welcomeImg.elem, {
            opacity: 1,
            duration: 10,
            ease: "slow"

        });


        //*Hent data/text fra json filen        
        for (let i = 0; i < this.content.articles[0].paragraphs.length; i++) {

            text.elem.innerHTML += this.content.articles[0].paragraphs[i].replace("\n", "<br>") + `<br><br>`;

        }
        text.elem.innerHTML += this.content.articles[0].link;
        welcomeHeading.elem.innerHTML = this.content.articles[0].title;

        /* #endregion */

        /* #region  Container 2 */
        this.bottomContainer = new CreateHtmlElements({
            type: "div",
            id: "bottomContainer", 
            class: ""
        });

        this.bottomContainer.ApplyElementToParent(this.mainContainer.elem);

        let tigerImg = new CreateHtmlElements({
            type: "img",
            id: "tigerImg",
            class: ""
        });

        tigerImg.elem.src = this.content.imageSources.pc[2];

        gsap.to(tigerImg.elem, {
            scrollTrigger: {
                trigger: tigerImg.elem,
                scrub: true,
                start: "top bottom",
                end: "top top"
            },
            x: 1010,
            duration: 2
        });

        tigerImg.ApplyElementToParent(this.bottomContainer.elem);


        /* #endregion */
    }
}
export default Content;