import fetchEvents from "./fetchEvents";

const listRef = document.querySelector(".events_collections");
const paginationRef = document.querySelector(".pag_numbers")


async function loadPage(page = 0) {
    const { events, totalPages, currentPage } = await fetchEvents(page);

    state.currentPage = currentPage;

    state.totalPages = Math.min(totalPages, 50);

    renderEvents(events);
    pagginationLoad();
    console.log("Events from API:", events);
}

function renderEvents(events = []) {

    if (!events.length) {
        listRef.innerHTML = "<p>No events</p>";
        return;
    }

    const html = events.map(({ images, name, dates, _embedded }) => {

        const venue = _embedded?.venues?.[0];
        const city = venue?.city?.name || "";
        const address = venue?.address?.line1 || "";

        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address + " " + city
        )}`;

        return `
        <li class="events_item">
        <div class="overflow"></div>
            <img class="events_img" src="${images?.[2]?.url}" alt="${name}" />
            <h3 class="events_title">${name}</h3>
            <p class="events__date">${dates?.start?.localDate || ""}</p>
            <a class="event__link " href="${mapLink}">
                ${city ? city + ", " : ""}${address}
            </a>
        </li>
        `;
    }).join("");

    listRef.innerHTML = html;
}
renderEvents();


const state = {
    totalPages: 0,
    currentPage: 0
}



function pagginationLoad() {
    const { currentPage, totalPages } = state;
    paginationRef.innerHTML = "";

    const createButton = (page) => {
        const btn = document.createElement("button");
        btn.textContent = page + 1;
        btn.classList.add("page")


        if (page === currentPage) {
            btn.classList.add("active")
        };

        btn.addEventListener("click", () => {
            loadPage(page);
        });

        paginationRef.appendChild(btn);
    }

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
