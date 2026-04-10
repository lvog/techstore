import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

class SplideCarousel {
  constructor(selector, options = {}) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.instance = null;
    this.breakpoint = 768;
  }

  init() {
    if (!this.el) return;

    this.check();
    window.addEventListener("resize", this.check.bind(this));
  }

  check() {
    const shouldDestroy = window.innerWidth >= this.breakpoint;

    if (shouldDestroy) {
      this.destroy();
    } else {
      this.create();
    }
  }

  create() {
    if (this.instance) return;

    const defaultOptions = {
      type: "loop",
      perPage: 1,
      pagination: false,
      arrows: false,
      autoplay: true,
    };

    this.instance = new Splide(this.el, {
      ...defaultOptions,
      ...this.options,
    });

    this.instance.mount();
  }

  destroy() {
    this.el.style.visibility = "visible";
    if (!this.instance) return;

    this.instance.destroy(true);
    this.instance = null;
  }
}

export const productsCarousel = new SplideCarousel(".products-splide");
