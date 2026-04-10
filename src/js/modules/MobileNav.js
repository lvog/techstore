class MobileNav {
  constructor(selector) {
    this.dropSelector = selector;
    this.activeClass = "nav-active";
    this.openerSelector = ".nav-opener";
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    document.body.addEventListener("click", (e) => {
      const opener = e.target.closest(this.openerSelector);
      const isDrop = e.target.closest(this.dropSelector);

      if (opener) {
        e.preventDefault();
        this.toggle();
        return;
      }

      if (!isDrop) {
        this.close();
      }
    });
  }

  toggle() {
    document.body.classList.toggle(this.activeClass);
  }

  close() {
    document.body.classList.remove(this.activeClass);
  }
}

export const mobileNav = new MobileNav(".drop");
