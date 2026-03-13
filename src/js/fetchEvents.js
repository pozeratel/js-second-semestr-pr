import { URL, API_KEY, pages } from "./config.js"

export default async function fetchEvents(page = 0, keyword = "", country = "") {

    let url = `${URL}?apikey=${API_KEY}&page=${page}&size=20`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    if (country) {
        url += `&countryCode=${country}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
        events: data._embedded?.events || [],
        totalPages: data.page.totalPages,
        currentPage: data.page.number
    };
}