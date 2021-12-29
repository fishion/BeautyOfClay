"use strict";

const config = require('../../config.json').eventbrite;
import eventbrite from 'eventbrite';

// Create configured Eventbrite SDK
const sdk = eventbrite({token: config.apiKey});
const categories = {
  "113" : "community", // community & culture
  "119" : "private"    // Hobbies and special interest
};
const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const eventDataBasic = (event) => {
  return {
    name: event.name.text,
    description: event.description.html,
    img: event.logo ? event.logo.url : undefined,
    sessions : [eventDataSession(event)],
    venue : event.venue
  }
}

const eventDataSession = (event) => {
  const eventStart = new Date(event.start.local);
  const eventEnd = new Date(event.end.local);
  const pricing = event.ticket_availability;
  const minString = mins => mins < 10 ? '0'+mins : mins;
  return {
    date  : eventStart.toLocaleDateString('en-GB', dateOptions),
    start : `${eventStart.getHours()}:${minString(eventStart.getMinutes())}`,
    end   : `${eventEnd.getHours()}:${minString(eventEnd.getMinutes())}`,
    url   : event.url,
    price : pricing.minimum_ticket_price.display == pricing.maximum_ticket_price.display ? pricing.minimum_ticket_price.display : undefined,
    priceMin : pricing.minimum_ticket_price.display,
    priceMax : pricing.maximum_ticket_price.display,
  }
}

const eventDataEnhanced = async (eventRef, event) => {
  // get additional event content 
  const eventContentResponse = await sdk.request(`/events/${event.id}/structured_content/`);
  eventRef.extraContent = eventContentResponse.modules
    ? eventContentResponse.modules
      .filter(item => item.data.body.text) // only want text for now
      .reduce((sum, item) => sum + item.data.body.text, '') // smush it together
    : ''
}

const eventHTML = (event) => {
  let html = ''
  html += '<article>'
  if (event.img) html +=   `<img src="${event.img}">`
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

const main = async () => {
  // get all events for organisation
  try {
    const eventsResponse = await sdk.request(`/organizations/${config.organisationId}/events/?status=draft,live,started,ended,completed&expand=venue,ticket_availability`);
    var events = eventsResponse.events;
  } catch(e){
    console.log(`api request failed : ${e.parsedError.description}`)
  }; 

  // want to end up with data structure :
  // groupedEvents = {category : {series_id : [event, ...], ...}, ...}
  const groupedEvents = Object.values(categories).reduce((ob, val)=>{ob[val] = {}; return ob},{});
  const eventDetailsPromises = [];
  for (const event of events) {
    //console.log(event)
    const categoryRef = groupedEvents[categories[event.category_id]]
    if (!categoryRef[event.series_id]) {
      // New series found - pull out basic data and async pull extra data
      categoryRef[event.series_id] = eventDataBasic(event);
      eventDetailsPromises.push(
        eventDataEnhanced(categoryRef[event.series_id], event)
      )
    } else {
      // Seen series before - add times
      categoryRef[event.series_id].sessions.push(eventDataSession(event))
    }
  };
  
  // wait for all the event details to pull down
  await Promise.all(eventDetailsPromises)

  // populate page
  //console.log(groupedEvents);
  Object.values(categories).forEach( category => {
    if (groupedEvents[category]){
      let eventListHTML = '';
      Object.values(groupedEvents[category]).forEach(event => {
        eventListHTML += eventHTML(event)
      })
      const section = document.getElementById(`${category}-sessions`);
      section.getElementsByClassName("article-grid")[0].innerHTML = eventListHTML;
      section.classList.remove('workshop-list-empty');
    }
  })
}

main();

