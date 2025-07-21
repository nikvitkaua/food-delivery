"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Tabs
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
    };

    // Timer
    const deadline = "2025-10-16",
        promotionEndDate = document.querySelector("#endPromotionDate");

    promotionEndDate.textContent = `${new Date(
        deadline
    ).getDate()} ${new Intl.DateTimeFormat("en-EN", { month: "long" }).format(
        new Date(deadline)
    )}`;

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    setClock(".timer", deadline);
});