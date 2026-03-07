import fetchEvents from "./fetchEvents";

const listRef = document.querySelector(".events_collections");
const paginationRef = document.querySelector(".pag_numbers");
const cards = document.querySelectorAll('.fade-in');
const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector(".modal-close");

const modalLogo = document.querySelector(".event-logo");
const modalBigLogo = document.querySelector(".modal-big-logo");

async function loadPage(page = 0) {
    const { events, totalPages, currentPage } = await fetchEvents(page);
    state.currentPage = currentPage;
    state.totalPages = Math.min(totalPages, 50);
    renderEvents(events);
    pagginationLoad();
    console.log("Events from API:", events);
}

function renderEvents(events = []) {
    const html = events.map(({ images, name, dates, _embedded }) => {
        const venue = _embedded?.venues?.[0];
        const city = venue?.city?.name || "";
        const address = venue?.address?.line1 || "";
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address + " " + city
        )}`;

        const img = images?.[0]?.url || "./img/no-image.jpg";

        return `
        <li class="events_item fade-in is-visible" data-img="${img}">
            <div class="overflow"></div>
            <img class="events_img" src="${img}" alt="${name}" />
            <h3 class="events_title">${name}</h3>
            <p class="events__date">${dates?.start?.localDate || ""}</p>
            <div class="event-box">
                <img class="modal-place" src="./img/place.svg" alt="place">
                <a class="event__link" href="${mapLink}">${city}</a>
            </div>       
        </li>`;
    }).join("");

    listRef.innerHTML = html;
}

const state = {
    totalPages: 0,
    currentPage: 0
};

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
        paginationRef.appendChild(document.createTextNode("..."));
    }

    for (let i = start; i <= end; i += 1) {
        createButton(i);
    }

    if (end < totalPages - 1) {
        paginationRef.append("...");
        createButton(totalPages - 1);
    }
}

loadPage(0);

cards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('is-visible');
    }, index * 60);
});

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

backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
        backdrop.classList.remove('is-open');
    }
});

window.addEventListener("keydown", onEscClose);

function onEscClose(event) {
    if (event.code === "Escape") {
        backdrop.classList.remove("is-open");
    }
}

closeBtn.addEventListener("click", () => {
    backdrop.classList.remove("is-open");
});