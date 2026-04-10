class FormValidation {
  constructor(selector, options = {}) {
    this.form = document.querySelector(selector);
    this.fields = [];
    this.options = {
      errorClass: "input-error",
      ...options,
    };
  }

  init() {
    if (!this.form) return;
    this.form.setAttribute("novalidate", "true");
    this.findElements();
    this.bindEvents();
  }

  findElements() {
    this.fields = [...this.form.querySelectorAll("[data-required='true']")];
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const isValid = this.validateForm();

      if (isValid) {
        this.form.reset();
      }
    });

    this.fields.forEach((field) => {
      field.addEventListener("blur", () => this.validateField(field));
      field.addEventListener("input", () => this.validateField(field));
    });
  }

  validateForm() {
    let isValid = true;

    this.fields.forEach((field) => {
      const valid = this.validateField(field);
      if (!valid) isValid = false;
    });

    return isValid;
  }

  validateField(field) {
    const type = field.dataset.type;
    const value = field.value.trim();
    const required = field.dataset.required === "true";
    const min = field.hasAttribute("data-min")
      ? Number(field.dataset.min)
      : null;

    const max = field.hasAttribute("data-max")
      ? Number(field.dataset.max)
      : null;

    let isValid = true;

    if (required && !value.length) {
      isValid = false;
    }

    if (value.length && isValid) {
      switch (type) {
        case "email":
          isValid = this.validateEmail(value);
          break;

        case "text":
        default:
          isValid = this.validateText(value, min, max);
          break;

        case "number":
          isValid = this.validateNumber(value, min, max);
          break;
      }
    }

    this.toggleError(field, isValid);

    return isValid;
  }

  validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  validateNumber(value, min, max) {
    const num = Number(value);

    if (isNaN(num)) return false;

    if (min !== null && num < min) return false;
    if (max !== null && num > max) return false;

    return true;
  }

  validateText(value, min, max) {
    if (min !== null && value.length < min) return false;
    if (max !== null && value.length > max) return false;

    return true;
  }

  toggleError(field, isValid) {
    const formGroup = field.closest(".form-group");

    formGroup.classList.toggle(this.options.errorClass, !isValid);
  }
}

export const formValidation = new FormValidation(".contact-form");
