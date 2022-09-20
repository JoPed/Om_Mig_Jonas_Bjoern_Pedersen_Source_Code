import CreateNavbar from "./CreateNavbar";
import Content from "./Content";



//* Til brug af forskellige ikoner, https://fontawesome.com/
import "../assets/fontawesome/css/all.min.css";
import "../assets/css/main.min.css";



// **  IIFE: Immediately Invoked Function Expression  */

(function () {

  //*Global array, to store images on the site
  Window.images = [];

  console.log("starting the cool->app");

  let navbar = new CreateNavbar();

  let content = new Content();


})();
