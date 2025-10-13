'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const inputName = document.querySelector('input[name="fullname"]');
const inputEmail = document.querySelector('input[name="email"]');
const inputMessage = document.querySelector('textarea[name="message"]');

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

if (window.emailjs && form) {

  emailjs.init("09pQjJGPRL1Lqrz_C");

  console.log("EmailJS initialized:", !!window.emailjs);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const templateParams = {
      from_name: inputName ? inputName.value : "",
      from_email: inputEmail ? inputEmail.value : "",
      message: inputMessage ? inputMessage.value : "",
    };

    formBtn.setAttribute("disabled", "");

      console.log("EmailJS payload:", {
        service_id: "nishantmakwanaa",
        template_id: "template_qfvbqle",
        public_key: "09pQjJGPRL1Lqrz_C",
        templateParams,
      });

      emailjs
        .send("nishantmakwanaa", "template_qfvbqle", templateParams, "09pQjJGPRL1Lqrz_C")
      .then(function (response) {
        console.log("EmailJS send success:", response);
        form.reset();
        showToast('Message sent Successfully !', 'success');
      })
      .catch(function (err) {
        console.error("EmailJS send error:", err);
        formBtn.removeAttribute("disabled");

        const detail = err && err.text ? "\n" + err.text : "";
        showToast("Failed To Send Message. Please Try Again..." + detail, 'error');
      });
  });
}

function showToast(message, type = 'success', timeout = 6000) {
  if (!message) return;
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast ' + (type === 'error' ? 'toast--error' : 'toast--success');

  const icon = document.createElement('div');
  icon.className = 'toast__icon';
  icon.innerHTML = type === 'error' ? '✖' : '✔';

  const msg = document.createElement('div');
  msg.className = 'toast__message';
  msg.textContent = message;

  const close = document.createElement('button');
  close.className = 'toast__close';
  close.setAttribute('aria-label', 'Close notification');
  close.innerHTML = '×';
  close.addEventListener('click', function () { container.removeChild(toast); });

  toast.appendChild(icon);
  toast.appendChild(msg);
  toast.appendChild(close);

  container.appendChild(toast);

  setTimeout(function () {
    try { if (container.contains(toast)) container.removeChild(toast); } catch (e) { /* ignore */ }
  }, timeout);
}