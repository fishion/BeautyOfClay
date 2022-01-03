"use strict";

const workshopAPI = require('../../config.json').workshops.workshopAPI;

const getEvents = async () => {
  const res = await fetch(workshopAPI, {
    method : 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'no-cache'
  })
  if (res.ok) {
    const responseData = await res.json();
    return responseData.result
  }
  if (res.status === 400) {
    const json = await res.json()
    throw Error(json.error)
  }
  throw Error(`Unexpected error : ${res.statusText}`);
}

const displayEvents = (groupedEvents) => {
  Object.keys(groupedEvents).forEach( category => {
    let eventListHTML = '';
    Object.values(groupedEvents[category]).forEach(event => {
      eventListHTML += eventHTML(event)
    })
    const section = document.getElementById(`${category}-sessions`);
    section.getElementsByClassName("article-grid")[0].innerHTML = eventListHTML;
    section.classList.remove('workshop-list-empty');
  })
}

const eventHTML = (event) => {
  let html = ''
  html += '<article>'
  if (event.img) html += `<img src="${event.img}">`
  html +=   `<h4>${event.name}</h4>`
  html +=   `<p>${event.description}</p>`
  html +=   event.extraContent
  html +=   `<div class="event-details">`
  html +=     `<h5>Location : </h5> <p><a href="http://maps.google.com?q=${event.venue.latitude},${event.venue.longitude}" target="new">${event.venue.name}</a></p>`
  html +=     `<h5>Sessions : </h5> <ul>`
  for (let i=0; i<event.sessions.length; i++){
    const session = event.sessions[i];
    const sTime = `${session.date} | ${session.start} - ${session.end} `;
    const sPrice = session.price ? session.price : `${session.priceMin} to ${session.priceMax}`
    html += `<li>${sTime} <a href="${session.url}" target="new" class="button">Book on Eventbrite (${sPrice})</a></li>`
  }
  html +=     `</ul>`
  html +=   `<div>`
  html += '</article>'
  return html;
}

// run main immediately
(async () => {
  try {
    const groupedEvents = await getEvents();
    displayEvents(groupedEvents)
  } catch (e){
    console.log(`Failed to fetch events : ${e}`)
  }
})()

