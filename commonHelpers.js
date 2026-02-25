(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h="https://app.ticketmaster.com/discovery/v2/events.json",v="SD3dPZKqy7tpTs7VjSSru5mwqnGlbhOg",g=50;async function d(){return(await(await fetch(`${h}?apikey=${v}&page=${g}&size=20`)).json())._embedded.events}const $=document.querySelector(".events_collections");d().then(c=>console.log(c));async function w(){const o=(await d()).map(({images:r,name:n,dates:e,_embedded:t})=>{var a,l,f,u,p;const s=(a=t==null?void 0:t.venues)==null?void 0:a[0],m=((l=s==null?void 0:s.city)==null?void 0:l.name)||"",i=((f=s==null?void 0:s.address)==null?void 0:f.line1)||"",y=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(i+" "+m)}`;return`
        <li class="events_item">
        <div class="overflow"></div>
            <img src="${(u=r==null?void 0:r[2])==null?void 0:u.url}" alt="${n}" class="events_img" />
            <h3 class="events_title">${n}</h3>
            <p class="events__date">${(p=e==null?void 0:e.start)==null?void 0:p.localDate}</p>
             <a href="${y}" class="event__link">${i}</a>
        </li>
        `}).join("");$.insertAdjacentHTML("beforeend",o)}w();
//# sourceMappingURL=commonHelpers.js.map
