// import CreateNavbar from "./CreateNavbar";
import Content from "./Content";

//*HTML - Head
document.title = "Om Mig";

//* Til brug af forskellige ikoner, npmjs -> fortawesome/fontawesome-free
import "@fortawesome/fontawesome-free/js/all.js"



import "../assets/css/main.min.css";
import "../assets/css/tablet.min.css";
import "../assets/css/mobile.min.css";



//* NOTE: When looking in the browser, the pin-space element, is from GSAP
(function () {

  //*Global array, to store images on the site
  Window.images = [];
  
  let content = new Content();


})();
