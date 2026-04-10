class Favorites {
  constructor(options = {}) {
    this.cardSelector = options.cardSelector || ".card";
    this.buttonSelector = options.buttonSelector || ".btn-favorite";
    this.activeClass = options.activeClass || "checked";
    this.counterSelector = options.counterSelector || ".favorite-holder .num";

    this.cards = [];
    this.counters = [];
  }

  init() {
    this.findElements();
    this.bindEvents();
    this.updateCounter();
  }

  findElements() {
    this.cards = document.querySelectorAll(this.cardSelector);
    this.counters = document.querySelectorAll(this.counterSelector);
  }

  bindEvents() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(this.buttonSelector);

      if (!btn) return;

      const card = btn.closest(this.cardSelector);

      if (!card) return;

      this.toggleFavorite(card);
    });
  }

  toggleFavorite(card) {
    card.classList.toggle(this.activeClass);
    this.updateCounter();
  }

  getFavoritesCount() {
    return document.querySelectorAll(`${this.cardSelector}.${this.activeClass}`)
      .length;
  }

  updateCounter() {
    const count = this.getFavoritesCount();

    this.counters.forEach((el) => {
      el.textContent = count || "";

      if (count > 0) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }
}

export const favorites = new Favorites();
