export const contryInput = document.querySelector(".header__select");
export default function countrySearch(events = []) {
    const countries = events.map(({ _embedded }) => ({
        name: _embedded?.venues?.[0]?.country?.name,
        code: _embedded?.venues?.[0]?.country?.countryCode
    }));
    const uniqueCountries = Array.from(
        new Map(countries.map(c => [c.code, c])).values()
    );

    const renderCountry = uniqueCountries
        .map(c => `<option value="${c.code}">${c.name}</option>`)
        .join("");
    contryInput.insertAdjacentHTML("beforeend", renderCountry);

    return uniqueCountries;
}



