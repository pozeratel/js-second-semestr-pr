import { URL, API_KEY, pages } from "./config.js"

export default async function fetchEvents(page = 0) {
    const response = await fetch(
        `${URL}?apikey=${API_KEY}&page=${page}&size=20`
    );

    const data = await response.json();

    return {
        events: data._embedded?.events || [],
        totalPages: data.page.totalPages,
        currentPage: data.page.number   
    };
}