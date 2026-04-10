class DropdownMenu {
  constructor(selector) {
    this.menu = document.querySelector(selector);
    this.items = [];
    this.activeClass = "hover";
    this.breakpoint = 768;
  }

  init() {
    if (!this.menu) return;

    this.findElements();
    this.addDropdownClass();
    this.bindEvents();
  }

  findElements() {
    this.items = this.menu.querySelectorAll("li");
  }

  addDropdownClass() {
    this.items.forEach((item) => {
      const submenu = item.querySelector("ul");

      if (submenu) {
        item.classList.add("has-dropdown");
        item._submenu = submenu;
      }
    });
  }

  bindEvents() {
    this.menu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const item = link.parentElement;

      if (!item.classList.contains("has-dropdown")) return;

      const trigger = item.querySelector(":scope > a");
      if (link !== trigger) return;

      e.preventDefault();

      if (item.classList.contains(this.activeClass)) {
        this.close(item);
      } else {
        this.closeAll();
        this.open(item);
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.menu.contains(e.target)) {
        this.closeAll();
      }
    });

    window.addEventListener("resize", () => {
      this.resetStyles();
    });
  }

  open(item) {
    const submenu = item._submenu;

    if (!this.isDesktop() && submenu) {
      submenu.style.height = submenu.scrollHeight + "px";
    }

    item.classList.add(this.activeClass);
  }

  close(item) {
    const submenu = item._submenu;

    if (!this.isDesktop() && submenu) {
      submenu.style.height = "0px";
    }

    item.classList.remove(this.activeClass);
  }

  closeAll() {
    this.items.forEach((item) => {
      if (item.classList.contains("has-dropdown")) {
        this.close(item);
      }
    });
  }

  isDesktop() {
    return window.innerWidth >= this.breakpoint;
  }

  resetStyles() {
    this.items.forEach((item) => {
      const submenu = item._submenu;

      if (submenu) {
        submenu.style.height = "";
      }

      item.classList.remove(this.activeClass);
    });
  }
}

export const dropDownMenu = new DropdownMenu(".menu");
