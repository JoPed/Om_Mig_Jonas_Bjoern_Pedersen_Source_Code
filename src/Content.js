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

        //* Inputting content in the first container
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

        let welcomeText = new CreateHtmlElements({
            type: "p",
            id: "",
            class: ""
        });

        welcomeHeading.ApplyElementToParent(welcomeArticle.elem);
        welcomeText.ApplyElementToParent(welcomeArticle.elem);

        /* #region  Welcome Image - Portugal Img */
        let welcomeImgFigure = new CreateHtmlElements({
            type: "figure",
            id: "welcomeImgFigure",
            class: ""
        });

        let welcomeImgFigCaption = new CreateHtmlElements({
            type: "figcaption",
            id: "",
            class: ""
        });

        let welcomeImg = new CreateHtmlElements({
            type: "img",
            id: "",
            class: ""
        });


        welcomeImgFigure.ApplyElementToParent(welcomeArticle.elem);
        welcomeImg.ApplyElementToParent(welcomeImgFigure.elem);
        welcomeImgFigCaption.ApplyElementToParent(welcomeImgFigure.elem);
        welcomeImgFigCaption.elem.innerHTML = this.content.imageSources.altText[1];

        Window.images.push(welcomeImg.elem);

        //*Fading the first image (that is already in the viewport)
        gsap.to(welcomeImgFigure.elem, {
            opacity: 1,
            duration: 10,
            ease: "slow"

        });
        /* #endregion */


        //*Hent data/text fra json filen        
        for (let i = 0; i < this.content.articles[0].paragraphs.length; i++) {

            welcomeText.elem.innerHTML += this.content.articles[0].paragraphs[i].replace("\n", "<br>") + `<br><br>`;

        }
        welcomeText.elem.innerHTML += this.content.articles[0].link;
        welcomeHeading.elem.innerHTML = this.content.articles[0].title;

        /* #endregion */

        /* #region  Container 2 */
        this.bottomContainer = new CreateHtmlElements({
            type: "div",
            id: "bottomContainer",
            class: ""
        });

        this.bottomContainer.ApplyElementToParent(this.mainContainer.elem);

        /* #region  Tiger Image */
        let tigerImgFigure = new CreateHtmlElements({
            type: "figure",
            id: "tigerImgFigure",
            class: ""
        });

        let tigerImg = new CreateHtmlElements({
            type: "img",
            id: "tigerImg",
            class: ""
        });

        let tigerImgFigCaption = new CreateHtmlElements({
            type: "figcaption",
            id: "",
            class: ""
        });

        tigerImgFigure.ApplyElementToParent(this.bottomContainer.elem);
        tigerImg.ApplyElementToParent(tigerImgFigure.elem);
        tigerImgFigCaption.ApplyElementToParent(tigerImgFigure.elem);
        tigerImgFigCaption.elem.innerHTML = this.content.imageSources.altText[2];

        Window.images.push(tigerImg.elem);

        //* Gsap scrolltrigger on tigerImg
        gsap.to(tigerImgFigure.elem, {
            scrollTrigger: {
                trigger: tigerImg.elem,
                scrub: true,
                start: "top bottom",
                end: "top top"
            },
            x: 590,
            duration: 2
        });
        /* #endregion */


        let factsSection = new CreateHtmlElements({
            type: "section",
            id: "factsSection",
            class: ""
        });

        factsSection.ApplyElementToParent(this.bottomContainer.elem);

        let factsHeading = new CreateHtmlElements({
            type: "h2",
            id: "",
            class: ""
        });

        factsHeading.elem.innerHTML = this.content.facts.factsTitle;
        factsHeading.ApplyElementToParent(factsSection.elem);



        this.factsList = new CreateHtmlElements({
            type: "ul",
            id: "factsList",
            class: ""
        });

        this.factsList.ApplyElementToParent(factsSection.elem);

        this.CreateListItemsFactsList();
        console.log(Window.images);

        this.SetImgSrcAndAltText();


        /* #endregion */
    }

    CreateListItemsFactsList() {
        for (let i = 0; i < this.content.facts.factsListItems.length; i++) {
            let li = new CreateHtmlElements({
                type: "li",
                id: "",
                class: ""
            });

            li.ApplyElementToParent(this.factsList.elem);

            let listItem = document.createTextNode(this.content.facts.factsListItems[i]);
            li.elem.appendChild(listItem);
        }
    }

    SetImgSrcAndAltText() {
        for (let i = 0; i < Window.images.length; i++) {

            Window.images[i].alt = this.content.imageSources.altText[i];
            Window.images[i].src = this.content.imageSources.pc[i];
        }
    }
}
export default Content;