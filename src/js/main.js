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
    }

    // Timer
    const deadline = "2025-10-16",
        promotionEndDate = document.querySelector("#endPromotionDate");

    promotionEndDate.textContent = `${new Date(
        deadline
    ).getDate()} ${new Intl.DateTimeFormat("en-EN", { month: "long" }).format(
        new Date(deadline)
    )}`;

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
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
    }

    setClock(".timer", deadline);

    // Modal
    const modal = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector("[data-close]"),
        modalTriggers = document.querySelectorAll("[data-modal]");

    function modalClose() {
        modal.classList.toggle("show");
        document.body.style.overflow = "";
    }

    function modalShow() {
        modal.classList.toggle("show");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    modalTriggers.forEach((item) => {
        item.addEventListener("click", modalShow);
    });

    modalCloseBtn.addEventListener("click", modalClose);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modalClose();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            modalClose();
        }
    });

    // const modalTimerId = setTimeout(modalShow, 10000);

    function modalShowByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            modalShow();
            window.removeEventListener("scroll", modalShowByScroll);
        }
    }

    window.addEventListener("scroll", modalShowByScroll);

    // Menu cards
    class MenuCard {
        constructor(imgUrl, title, text, price, parentSelector, ...classes) {
            this.imgUrl = imgUrl;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 41;
            this.changeToUSD();
        }

        changeToUSD() {
            this.price = Math.round(this.price / this.transfer);
        }

        render () {
            const div = document.createElement("div");
            
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                div.classList.add(this.classes); 
            } else {
                this.classes.forEach((className) => div.classList.add(className));
            }

            div.innerHTML = `
                <img src="${this.imgUrl}" alt="${this.title}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> $ per day</div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    const menuFitness = new MenuCard(
        "img/tabs/vegy.jpg",
        'Menu "Fitness"',
        "The Fitness menu is a new approach to cooking: more fresh fruits and vegetables. The product of active and healthy people. It is a completely new product with optimal price and high quality!",
        9389,
        ".menu__field .container",
        "menu__item"
    );

    const menuPremium = new MenuCard(
        "img/tabs/elite.jpg",
        'Menu "Premium"',
        "In the “Premium” menu we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!",
        22550,
        ".menu__field .container",
        "menu__item",
    );

    const menuLenten = new MenuCard(
        "img/tabs/post.jpg",
        'Menu "Lenten"',
        "The Lenten menu is a careful selection of ingredients: no animal products at all, milk made from almonds, oats, coconut or buckwheat, the right amount of protein through tofu and imported vegetarian steaks.",
        17630,
        ".menu__field .container",
        "menu__item"
    );

    menuFitness.render();
    menuPremium.render();
    menuLenten.render();
});