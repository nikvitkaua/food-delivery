/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


document.addEventListener("DOMContentLoaded", () => {
  const tabContainer = document.querySelector(".tabcontainer"),
    tabs = tabContainer.querySelectorAll(".tabcontent"),
    tabsTitle = tabContainer.querySelectorAll(".tabheader__item");
  tabsTitle.forEach((item, i) => {
    item.addEventListener("click", () => {
      removeActiveClass(tabContainer, "tabheader__item_active");
      item.classList.add("tabheader__item_active");
      removeActiveClass(tabContainer, "tabcontent--active");
      tabs[i].classList.add("tabcontent--active");
    });
  });
  function removeActiveClass(parent, activeClass) {
    parent.querySelector(`.${activeClass}`).classList.remove(activeClass);
  }
  ;
});
/******/ })()
;
//# sourceMappingURL=script.js.map