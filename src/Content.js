import content from "./ContentData.json";
import CreateHtmlElements from "./CreateHtmlElements";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import $ from "jquery";

class Content {
    constructor() {
        gsap.registerPlugin(ScrollTrigger, CSSRulePlugin, ScrollToPlugin);


        //* Reference the json data.
        this.content = content;


        //* Instantiate the CreateNavbar class
        let navbar = new Navbar();


        //* Creating main container
        this.mainContainer = new CreateHtmlElements({
            type: "main",
            id: "mainContent"
        });

        this.mainContainer.ApplyElementToParent(document.body);

        /* #region  Container 1 */
        //* Create first section
        this.topContainer = new CreateHtmlElements({
            type: "div",
            id: "topContainer",
            class: "content"
        });
        //* Inputting content in the first container
        this.welcomeArticle = new CreateHtmlElements({

            type: "article",
            id: "welcomeArticle",
            class: ""
        });

        this.welcomeHeading = new CreateHtmlElements({
            type: "h1",
            id: "",
            class: ""
        });

        this.welcomeText = new CreateHtmlElements({
            type: "p",
            id: "",
            class: ""
        });

        this.welcomeImgFigure = new CreateHtmlElements({
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
        Window.images.push(welcomeImg.htmlElem);

        this.topContainer.ApplyElementToParent(this.mainContainer.htmlElem);

        this.welcomeArticle.ApplyElementToParent(this.topContainer.htmlElem);
        this.welcomeHeading.ApplyElementToParent(this.welcomeArticle.htmlElem);
        this.welcomeText.ApplyElementToParent(this.welcomeArticle.htmlElem);

        this.welcomeImgFigure.ApplyElementToParent(this.welcomeArticle.htmlElem);
        welcomeImg.ApplyElementToParent(this.welcomeImgFigure.htmlElem);
        welcomeImgFigCaption.ApplyElementToParent(this.welcomeImgFigure.htmlElem);
        welcomeImgFigCaption.htmlElem.innerHTML = this.content.imageSources.altText[1];

        /* #endregion */

        /* #region  Container 2 */
        this.middleContainer = new CreateHtmlElements({
            type: "div",
            id: "middleContainer",
            class: "content"
        });

        this.tigerImgFigure = new CreateHtmlElements({
            type: "figure",
            id: "tigerImgFigure",
            class: ""
        });

        let tigerImg = new CreateHtmlElements({
            type: "img",
            id: "tigerImg",
            class: ""
        });
        Window.images.push(tigerImg.htmlElem);

        let tigerImgFigCaption = new CreateHtmlElements({
            type: "figcaption",
            id: "",
            class: ""
        });

        let factsSection = new CreateHtmlElements({
            type: "section",
            id: "factsSection",
            class: ""
        });


        let factsHeading = new CreateHtmlElements({
            type: "h2",
            id: "",
            class: ""
        });

        this.factsList = new CreateHtmlElements({
            type: "ul",
            id: "factsList",
            class: ""
        });


        this.middleContainer.ApplyElementToParent(this.mainContainer.htmlElem);

        this.tigerImgFigure.ApplyElementToParent(this.middleContainer.htmlElem);
        tigerImg.ApplyElementToParent(this.tigerImgFigure.htmlElem);
        tigerImgFigCaption.ApplyElementToParent(this.tigerImgFigure.htmlElem);
        tigerImgFigCaption.htmlElem.innerHTML = this.content.imageSources.altText[2];

        factsSection.ApplyElementToParent(this.middleContainer.htmlElem);
        factsHeading.htmlElem.innerHTML = this.content.facts.factsTitle;
        factsHeading.ApplyElementToParent(factsSection.htmlElem);
        this.factsList.ApplyElementToParent(factsSection.htmlElem);





        /* #endregion */

        /* #region  Container 3 */
        this.bottomContainer = new CreateHtmlElements({
            type: "div",
            id: "bottomContainer",
            class: "content"
        });

        this.articleFuturePlans = new CreateHtmlElements({
            type: "article",
            id: "articleFuturePlans"
        });

        this.articleFuturePlansHeading = new CreateHtmlElements({
            type: "h2"
        });

        this.btnPressMe = new CreateHtmlElements({
            type: "button",
            id: "btnPressMe",
        });

        this.btnPressMe.htmlElem.innerHTML = "tryk her";

        this.futurePlans = new CreateHtmlElements({
            type: "p",
            id: "futurePlans"
        });

        this.portugalImgFigure = new CreateHtmlElements({
            type: "figure",
            id: "portugalImgFigure"
        });

        let portugalImg = new CreateHtmlElements({
            type: "img"
        });

        Window.images.push(portugalImg.htmlElem);

        let portugalImgFigCaption = new CreateHtmlElements({
            type: "figcaption"
        });


        this.bottomContainer.ApplyElementToParent(this.mainContainer.htmlElem);
        this.articleFuturePlans.ApplyElementToParent(this.bottomContainer.htmlElem);
        this.btnPressMe.ApplyElementToParent(this.bottomContainer.htmlElem);
        this.articleFuturePlansHeading.ApplyElementToParent(this.articleFuturePlans.htmlElem);
        this.futurePlans.ApplyElementToParent(this.articleFuturePlans.htmlElem);
        this.portugalImgFigure.ApplyElementToParent(this.bottomContainer.htmlElem);
        portugalImg.ApplyElementToParent(this.portugalImgFigure.htmlElem);
        portugalImgFigCaption.ApplyElementToParent(this.portugalImgFigure.htmlElem);
        portugalImgFigCaption.htmlElem.innerHTML = this.content.imageSources.altText[3];






        /* #endregion */

        /* #region  Calling functions & instantiating footer class */

        //*Reference the footer - and instantiate
        this.footer = new Footer(this.content, gsap);

        this.HandleWelcomeImgGsap();
        this.HandleWelcomeArticleText();

        this.CreateListItemsFactsList();
        this.HandleTigerImgGsap();
        this.HandleFuturePlansArticleText();

        this.ShowFutureArticleAndImg();

        this.SetImgSrcAndAltText();

        this.HandleLayeredScrollingTopMiddle();
        this.HandleLayeredScrollingMiddleBottom();

        navbar.HandleScrollingWithScrollTrigger("#navList .navLinks", "top 125px");
        navbar.HandleScrollingWithScrollTrigger("#navList .navLinkFuture", "-5px 125px");
        navbar.HighlighMenuPoints();

        /* #endregion */

    }

    SetImgSrcAndAltText() {
        for (let i = 0; i < Window.images.length; i++) {

            Window.images[i].alt = this.content.imageSources.altText[i];
            Window.images[i].src = this.content.imageSources.pc[i];
        }
    }

    HandleWelcomeArticleText() {
        //*Hent data/text fra json filen        
        for (let i = 0; i < this.content.articles[0].paragraphs.length; i++) {

            this.welcomeText.htmlElem.innerHTML += this.content.articles[0].paragraphs[i].replace("\n", "<br id='breakLine'>") + `<br><br>`;

        }
        this.welcomeText.htmlElem.innerHTML += this.content.articles[0].link;
        this.welcomeHeading.htmlElem.innerHTML = this.content.articles[0].title;
    }

    HandleWelcomeImgGsap() {
        //*Fading the first image (that is already in the viewport)
        gsap.to(this.welcomeImgFigure.htmlElem, {
            opacity: 1,
            duration: 10,
            ease: "slow"

        });
    }

    CreateListItemsFactsList() {
        for (let i = 0; i < this.content.facts.factsListItems.length; i++) {
            let li = new CreateHtmlElements({
                type: "li",
                id: "",
                class: ""
            });

            li.ApplyElementToParent(this.factsList.htmlElem);

            let listItem = document.createTextNode(this.content.facts.factsListItems[i]);
            li.htmlElem.appendChild(listItem);
        }
    }

    HandleTigerImgGsap() {
        //* Gsap scrolltrigger on tigerImg

        let matchMedia = gsap.matchMedia();

        matchMedia.add({
            isDesptop: "(min-width: 992px)",
            isMobile: "(max-width: 991px)"
        }, (context) => {

            let { isDesptop, isMobile } = context.conditions;

            if (isDesptop) {
                gsap.to(this.tigerImgFigure.htmlElem, {
                    scrollTrigger: {
                        trigger: this.tigerImgFigure.htmlElem,
                        //setting scrub to a number value, means it is going to take x amount of time to catch up with the scroll trigger. Setting scrub:true instead makes it follow the scrolltrigger
                        scrub: true,
                        start: "top bottom",
                        end: "top 225px"
                    },
                    x: 590,
                });
            }
            else{
                this.tigerImgFigure.htmlElem.style.left = "0";
            }
        });


    }

    HandleFuturePlansArticleText() {
        for (let i = 0; i < this.content.articles[1].paragraphs.length; i++) {
            this.futurePlans.htmlElem.innerHTML += this.content.articles[1].paragraphs[i] + `<br><br>`
        }

        let headingNode = document.createTextNode(this.content.articles[1].title);
        this.articleFuturePlansHeading.htmlElem.appendChild(headingNode);

    }

    ShowFutureArticleAndImg() {

        let matchMedia = gsap.matchMedia();

        //*Only use gsap when screen size is minimum 992px
        matchMedia.add({
            isDesptop: "(min-width: 992px)",
            isMobile: "(max-width: 991px)"
        }, (context) => {

            let { isDesptop, isMobile } = context.conditions;

            if(isDesptop){

                //*First use context to add functionality onClick. Then add that, to an actual eventListener.
                //*Then on return (clean up code) remove that eventlistener.
                context.add("onClick", () => {
    
                    let btnPsydoSelector = CSSRulePlugin.getRule("#bottomContainer #btnPressMe::before")
                    let timeLine = gsap.timeline({ paused: false });
    
    
                    this.footer.ShowFooter();
    
                    gsap.to(this.articleFuturePlans.htmlElem, {
                        duration: 5,
                        x: 570,
                        opacity: 1,
                        ease: "bounce",
    
                        onComplete: () => {
                            timeLine.to(this.btnPressMe.htmlElem, {
                                duration: 2,
                                ease: "slow",
    
                                onComplete: () => {
                                    this.btnPressMe.htmlElem.style.padding = 0;
                                    this.btnPressMe.htmlElem.innerHTML = "";
    
                                    gsap.to(btnPsydoSelector, {
                                        duration: 1,
                                        height: 0,
                                        opacity: 0,
                                        ease: "slow"
                                    })
                                }
                            })
    
                            timeLine.to(this.btnPressMe.htmlElem, {
                                duration: .8,
                                height: .2,
                                opacity: .5,
                                boxShadow: "0px 0px 35px 7px rgb(240, 169, 37)",
                                delay: .25
                            })
                            timeLine.to(this.btnPressMe.htmlElem, {
                                duration: .1,
                                opacity: .5,
                                background: "#26ff92"
                            })
                            timeLine.to(this.btnPressMe.htmlElem, {
                                duration: 0,
                                width: 100,
                                delay: .2
                            })
                            timeLine.to(this.btnPressMe.htmlElem, {
                                duration: .1,
                                boxShadow: "0px 0px 100px 55px rgb(255, 140, 0)",
                                height: 0,
                                delay: .23
                            })
                            timeLine.to(this.btnPressMe.htmlElem, {
                                duration: .8,
                                width: 500,
                                x: 2000,
                                boxShadow: "0px 0px 85px 17px rgb(255, 140, 0)",
                                delay: .2,
    
                                onComplete: () => {
                                    gsap.to(this.portugalImgFigure.htmlElem, {
                                        x: -570,
                                        duration: 2,
                                        opacity: 1,
                                        ease: "bounce",
    
                                        onComplete: () => {
                                            gsap.to(window, {
                                                duration: 1.5,
                                                scrollTo: "#mainFooter"
                                            });
                                        }
                                    });
                                }
                            });
    
    
                        }
                    });
    
                });

                this.btnPressMe.htmlElem.addEventListener("click", context.onClick);

            }
            else{
                this.btnPressMe.htmlElem.style.display = "none";
                this.portugalImgFigure.htmlElem.style.opacity = "1";
                this.portugalImgFigure.htmlElem.style.left = "0";
                this.articleFuturePlans.htmlElem.style.opacity = "1";
                this.articleFuturePlans.htmlElem.style.left = "0";
                $("#mainFooter").css("height", "350px");
                $("#mainFooter > *").css("opacity", "1");
            }

            return ()=> {
                this.btnPressMe.htmlElem.removeEventListener("click", context.onClick);
                
            }


        })


    }

    HandleLayeredScrollingTopMiddle() {

        let matchMedia = gsap.matchMedia();

        matchMedia.add({
            isDesptop: "(min-width: 576px)",
            isMobile: "(max-width: 575px)"
        }, (context) => {

            let {isDesptop, isMobile} = context.conditions;

            if(isDesptop){
                ScrollTrigger.create({
                    trigger: this.topContainer.htmlElem,
                    start: "top 125px",
                    end: "bottom 200px",
                    pin: "#topContainer",
                    pinSpacing: false
    
                });
            }
            else{
                ScrollTrigger.create({
                    trigger: this.topContainer.htmlElem,
                    start: "top -50%",
                    end: "bottom 200px",
                    pin: "#topContainer",
                    pinSpacing: false
    
                });
            }
            
        });

    }

    HandleLayeredScrollingMiddleBottom() {

        let matchMedia = gsap.matchMedia();

        matchMedia.add({
            isDesptop: "(min-width: 576px)",
            isMobile: "(max-width: 575px)"
        }, (context) => {

            let {isDesptop, isMobile} = context.conditions;

            if(isDesptop){
                ScrollTrigger.create({
                    trigger: this.middleContainer.htmlElem,
                    start: "top 125px",
                    end: "bottom 200px",
                    pin: "#middleContainer",
                    pinSpacing: false
    
                });
            }
            else{
                ScrollTrigger.create({
                    trigger: this.middleContainer.htmlElem,
                    start: "top 75px",
                    end: "bottom 200px",
                    pin: "#middleContainer",
                    pinSpacing: false
    
                });
            }
            
        });
        
    }

}
export default Content;