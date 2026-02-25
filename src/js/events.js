import fetchEvents from "./fetchEvents";

const listRef = document.querySelector(".events_collections");

fetchEvents().then(res => console.log(res))

async function renderEvents() {
    const arr = await fetchEvents();

    const item = arr.map(({ images, name, dates, _embedded }) => {
        const venue = _embedded?.venues?.[0];

        const city = venue?.city?.name || "";
        const address = venue?.address?.line1 || "";

        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + " " + city)}`;
        return `
        <li class="events_item">
        <div class="overflow"></div>
            <img src="${images?.[2]?.url}" alt="${name}" class="events_img" />
            <h3 class="events_title">${name}</h3>
            <p class="events__date">${dates?.start?.localDate}</p>
             <a href="${mapLink}" class="event__link">${city, address}</a>
        </li>
        `;
    }).join("");
    listRef.insertAdjacentHTML("beforeend", item);
}

renderEvents()

