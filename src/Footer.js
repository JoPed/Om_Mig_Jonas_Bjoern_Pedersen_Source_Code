import CreateHtmlElements from "./CreateHtmlElements";

class Footer{
    constructor(content){

        this.data = content;

        this.footer = new CreateHtmlElements({
            type: "footer",
            id: "mainFooter"
        });

        let infoText = new CreateHtmlElements({
            type: "div",
            id: "infoText"
        });

        let copyRightText = new CreateHtmlElements({
            type: "p",
            id: "crText"
        });

        this.icons = new CreateHtmlElements({
            type: "div",
            id: "soMEIcons"
        });

        this.footer.ApplyElementToParent(document.body);
        infoText.ApplyElementToParent(this.footer.htmlElem);
        copyRightText.ApplyElementToParent(this.footer.htmlElem);
        this.icons.ApplyElementToParent(this.footer.htmlElem);

        this.CreateSocialMediaIcons();
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
            let socialIcon = new CreateHtmlElements({
                type: "a"
            });

            let fontAwesome = new CreateHtmlElements({
                type: "i",
                class: `fa-brand.${this.data.socialMediaIcons.icon[index]}`
            });
            
            socialIcon.ApplyElementToParent(this.icons.htmlElem);
            fontAwesome.ApplyElementToParent(socialIcon.htmlElem);
        });    
    }
}
export default Footer;