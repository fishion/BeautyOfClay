import config from "../../config.json"

interface Session {
  date: string
  start: string
  end: string
  url: string
  price?: string
  priceMin?: string
  priceMax?: string
}

interface Venue {
  name: string
  latitude: number
  longitude: number
}

interface Event {
  name: string
  description: string
  img?: string
  extraContent: string
  venue: Venue
  sessions: Session[]
}

type GroupedEvents = Record<string, Record<string, Event>>

const getEvents = async (): Promise<GroupedEvents> => {
  const res = await fetch(config.workshops.workshopAPI, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    cache: "no-cache",
  })
  if (res.ok) {
    const responseData = await res.json()
    return responseData.result
  }
  if (res.status === 400) {
    const json = await res.json()
    throw Error(json.error)
  }
  throw Error(`Unexpected error : ${res.statusText}`)
}

const displayEvents = (groupedEvents: GroupedEvents): void => {
  Object.keys(groupedEvents).forEach(category => {
    const section = document.getElementById(`${category}-sessions`)
    if (!section) return

    if (Object.keys(groupedEvents[category]).length === 0) {
      section.classList.add("workshop-list-empty")
    } else {
      const articleGrid = section.getElementsByClassName("article-grid")[0]
      if (articleGrid) {
        articleGrid.innerHTML = eventsHTML(groupedEvents[category])
      }
    }
    section.classList.remove("loading")
  })
}

const eventsHTML = (eventList: Record<string, Event>): string => {
  let html = ""
  Object.values(eventList).forEach(event => {
    html += "<article>"
    if (event.img) html += `<img src="${event.img}">`
    html += `<h4>${event.name}</h4>`
    html += `<p>${event.description}</p>`
    html += event.extraContent
    html += '<div class="event-details">'
    html += `<h5>Location : </h5> <p><a href="http://maps.google.com?q=${event.venue.latitude},${event.venue.longitude}" target="new">${event.venue.name}</a></p>`
    html += "<h5>Sessions : </h5> <ul>"
    for (let i = 0; i < event.sessions.length; i++) {
      const session = event.sessions[i]
      const sTime = `${session.date} | ${session.start} - ${session.end} `
      const sPrice = session.price ? session.price : `${session.priceMin} to ${session.priceMax}`
      html += `<li>${sTime} <a href="${session.url}" target="new" class="button">Book on Eventbrite (${sPrice})</a></li>`
    }
    html += "</ul>"
    html += "<div>"
    html += "</article>"
  })
  return html
}

// run main immediately
;(async () => {
  try {
    const groupedEvents = await getEvents()
    displayEvents(groupedEvents)
  } catch (e) {
    console.log(`Failed to fetch events : ${e}`)
  }
})()
