import "../styles/style.scss";

import { resizeHandler } from "@js/utils/resizeHandler";
import { mobileNav } from "@js/modules/MobileNav";
import { dropDownMenu } from "@js/modules/DropDownMenu";
import { productsCarousel } from "@js/modules/SplideCarousel";
import { formValidation } from "@js/modules/FormValidation";
import { favorites } from "@js/modules/Favorites";

document.addEventListener("DOMContentLoaded", () => {
  resizeHandler();
  mobileNav.init();
  dropDownMenu.init();
  productsCarousel.init();
  formValidation.init();
  favorites.init();
});
