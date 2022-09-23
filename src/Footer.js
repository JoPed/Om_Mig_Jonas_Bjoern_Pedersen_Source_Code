import CreateHtmlElements from "./CreateHtmlElements";

class Footer{
    constructor(content){

        this.data = content;

        this.footer = new CreateHtmlElements({
            type: "footer",
            id: "mainFooter"
        });

        this.infoText = new CreateHtmlElements({
            type: "div",
            id: "infoText"
        });

        let infoTextHeading = new CreateHtmlElements({
            type: "h2"
        });

        infoTextHeading.htmlElem.innerHTML = this.data.info.title;

        let copyRightText = new CreateHtmlElements({
            type: "p",
            id: "crText"
        });

        copyRightText.htmlElem.innerHTML = this.data.copyright;

        this.icons = new CreateHtmlElements({
            type: "div",
            id: "soMEIcons"
        });

        let socialIconsHeading = new CreateHtmlElements({
            type: "h2", 
        });
        socialIconsHeading.htmlElem.innerHTML = this.data.socialMediaIcons.title; 



        this.footer.ApplyElementToParent(document.body);
        this.infoText.ApplyElementToParent(this.footer.htmlElem);
        copyRightText.ApplyElementToParent(this.footer.htmlElem);
        this.icons.ApplyElementToParent(this.footer.htmlElem);
        socialIconsHeading.ApplyElementToParent(this.icons.htmlElem);
        infoTextHeading.ApplyElementToParent(this.infoText.htmlElem);



        this.CreateSocialMediaIcons();
        this.CreateInfoIcons();
    }
    ShowFooter() {
        gsap.to(this.footer.htmlElem, {
            height: 200,
            duration: 2,
            ease: "bounce"
        });
    }

    CreateSocialMediaIcons(){
        this.data.socialMediaIcons.icon.forEach((ico, index) => {
            let socialIconLink = new CreateHtmlElements({
                type: "a"
            });

            let fontAwesome = new CreateHtmlElements({
                type: "i",
                class: `fa-brands.${this.data.socialMediaIcons.icon[index]}`
            });
            
            socialIconLink.ApplyElementToParent(this.icons.htmlElem);
            fontAwesome.ApplyElementToParent(socialIconLink.htmlElem);

            socialIconLink.htmlElem.href = `${this.data.socialMediaIcons.href[index]}`;
            socialIconLink.htmlElem.setAttribute("target", "_blank");
        });    
    }

    CreateInfoIcons(){
        for(let i = 0; i < this.data.info.icons.length; i++){

            let infoText_P = new CreateHtmlElements({
                type: "p"
            });

            let infoTextIcons = new CreateHtmlElements({
                type: "i",
                class: `fa-solid.${this.data.info.icons[i]}`
            });

            infoText_P.ApplyElementToParent(this.infoText.htmlElem);
            infoText_P.htmlElem.innerHTML += `${this.data.info.value[i]}`;
            infoTextIcons.ApplyElementToParent(infoText_P.htmlElem);


        }
    }
}
export default Footer;