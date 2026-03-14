import location from "../img/place.svg";
import fetchEvents from "./fetchEvents";
import countrySearch from "./country-search.js";
import { contryInput } from "./country-search.js";

const listRef = document.querySelector(".events_collections");
const paginationRef = document.querySelector(".pag_numbers");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".modal__close");
const searchInput = document.querySelector(".header__input");


const modalLogo = document.querySelector(".modal__logo");
const modalBigLogo = document.querySelector(".modal__big-logo");

let currentKeyword = "";
let currentContry = "";

const state = {
    totalPages: 0,
    currentPage: 0
};

async function loadMultiplePages(keyword) {
    let allEvents = [];
    for (let page = 0; page < 5; page++) {
        const { events } = await fetchEvents(page, keyword);
        allEvents = allEvents.concat(events);
    }
    return allEvents;
}

async function loadPage(page = 0) {
    const { events, totalPages, currentPage } = await fetchEvents(page, currentKeyword, currentContry);
    state.currentPage = currentPage;
    state.totalPages = Math.min(totalPages, 50);
    renderEvents(events);
    pagginationLoad();
}

function renderEvents(events = []) {
    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(currentKeyword.toLowerCase())
    );

    const html = filtered.map(({ images, name, dates, _embedded }) => {
        const venue = _embedded?.venues?.[0];
        const country = venue?.country
        const city = venue?.city?.name || "";
        const address = venue?.address?.line1 || "";
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + " " + city)}`;
        const img = images?.[0]?.url || "./img/no-image.jpg";

        return `
        <li class="events_item fade-in is-visible" data-img="${img}">
            <div class="overflow"></div>
            <img class="events_img" src="${img}" alt="${name}" />
            <h3 class="events_title">${name}</h3>
            <p class="events__date">${dates?.start?.localDate || ""}</p>
            <div class="modal__box">
                <img class="modal__place" src="${location}" alt="place">
                <a class="event__link" href="${mapLink}" target="_blank">${city}</a>
            </div>       
        </li>`;
    }).join("");

    listRef.innerHTML = html;
}

function pagginationLoad() {
    const { currentPage, totalPages } = state;
    paginationRef.innerHTML = "";
    const createButton = (page) => {
        const btn = document.createElement("button");
        btn.textContent = page + 1;
        btn.classList.add("page");
        if (page === currentPage) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            loadPage(page);
        });

        paginationRef.appendChild(btn);
    };

    const start = Math.max(0, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 0) {
        createButton(0);
        paginationRef.append("...");
    }

    for (let i = start; i <= end; i++) {
        createButton(i);
    }

    if (end < totalPages - 1) {
        paginationRef.append("...");
        createButton(totalPages - 1);
    }
}

function setModalImage(imgUrl) {
    modalLogo.src = imgUrl;
    modalBigLogo.src = imgUrl;
}

listRef.addEventListener("click", (e) => {
    const card = e.target.closest(".events_item");
    if (!card) return;
    const imgUrl = card.dataset.img;
    setModalImage(imgUrl);
    backdrop.classList.add("is-open");
});

backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
        backdrop.classList.remove("is-open");
    }
});

window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        backdrop.classList.remove("is-open");
    }
});

closeBtn.addEventListener("click", () => {
    backdrop.classList.remove("is-open");
});

function debounce(fn, delay = 400) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const debounceSearch = debounce(() => {
    currentKeyword = searchInput.value.trim();
    loadPage(0);
}, 400);
searchInput.addEventListener("input", debounceSearch);
loadPage(0);

async function loadCountries() {
    const { events } = await fetchEvents();
    const countries = countrySearch(events);
    console.log(countries);
}
loadCountries();

contryInput.addEventListener("change", () => {
    currentContry = contryInput.value;
    loadPage(0);
})