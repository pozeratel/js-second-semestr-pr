import { URL, API_KEY, pages } from "./config.js"

export default async function fetchEvents() {
    const response = await fetch(`${URL}?apikey=${API_KEY}&page=${pages}&size=20`)
    const data = await response.json();
    return data._embedded.events;
}