(()=>{"use strict";var e={181:e=>{e.exports=JSON.parse('{"yP":{"a":"https://api.maytreehousestudios.co.uk/eventbrite-events"}}')}},t={};function s(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,s),a.exports}(()=>{const e=s(181).yP.a;(async()=>{try{t=await(async()=>{const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors",cache:"no-cache"});if(t.ok)return(await t.json()).result;if(400===t.status){const e=await t.json();throw Error(e.error)}throw Error(`Unexpected error : ${t.statusText}`)})(),Object.keys(t).forEach((e=>{const s=document.getElementById(`${e}-sessions`);0===Object.keys(t[e]).length?s.classList.add("workshop-list-empty"):s.getElementsByClassName("article-grid")[0].innerHTML=(e=>{let t="";return Object.values(e).forEach((e=>{t+="<article>",e.img&&(t+=`<img src="${e.img}">`),t+=`<h4>${e.name}</h4>`,t+=`<p>${e.description}</p>`,t+=e.extraContent,t+='<div class="event-details">',t+=`<h5>Location : </h5> <p><a href="http://maps.google.com?q=${e.venue.latitude},${e.venue.longitude}" target="new">${e.venue.name}</a></p>`,t+="<h5>Sessions : </h5> <ul>";for(let s=0;s<e.sessions.length;s++){const r=e.sessions[s],o=`${r.date} | ${r.start} - ${r.end} `,a=r.price?r.price:`${r.priceMin} to ${r.priceMax}`;t+=`<li>${o} <a href="${r.url}" target="new" class="button">Book on Eventbrite (${a})</a></li>`}t+="</ul>",t+="<div>",t+="</article>"})),t})(t[e]),s.classList.remove("loading")}))}catch(e){console.log(`Failed to fetch events : ${e}`)}var t})()})()})();