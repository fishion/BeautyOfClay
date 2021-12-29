/*! For license information please see workshops.js.LICENSE.txt */
(()=>{var t={600:function(t,e){!function(t){"use strict";var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},e(t,r)};function r(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}var n=function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)};var o="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==o&&o,i="URLSearchParams"in o,s="Symbol"in o&&"iterator"in Symbol,a="FileReader"in o&&"Blob"in o&&function(){try{return new Blob,!0}catch(t){return!1}}(),u="FormData"in o,c="ArrayBuffer"in o;if(c)var h=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],f=ArrayBuffer.isView||function(t){return t&&h.indexOf(Object.prototype.toString.call(t))>-1};function d(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||""===t)throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function l(t){return"string"!=typeof t&&(t=String(t)),t}function p(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return s&&(e[Symbol.iterator]=function(){return e}),e}function y(t){this.map={},t instanceof y?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function b(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function m(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function v(t){var e=new FileReader,r=m(e);return e.readAsArrayBuffer(t),r}function w(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function g(){return this.bodyUsed=!1,this._initBody=function(t){var e;this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:a&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:u&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:i&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():c&&a&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=w(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):c&&(ArrayBuffer.prototype.isPrototypeOf(t)||f(t))?this._bodyArrayBuffer=w(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):i&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},a&&(this.blob=function(){var t=b(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?b(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(v)}),this.text=function(){var t,e,r,n=b(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=m(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},u&&(this.formData=function(){return this.text().then(O)}),this.json=function(){return this.text().then(JSON.parse)},this}y.prototype.append=function(t,e){t=d(t),e=l(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},y.prototype.delete=function(t){delete this.map[d(t)]},y.prototype.get=function(t){return t=d(t),this.has(t)?this.map[t]:null},y.prototype.has=function(t){return this.map.hasOwnProperty(d(t))},y.prototype.set=function(t,e){this.map[d(t)]=l(e)},y.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},y.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),p(t)},y.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),p(t)},y.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),p(t)},s&&(y.prototype[Symbol.iterator]=y.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function E(t,e){if(!(this instanceof E))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,o=(e=e||{}).body;if(t instanceof E){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new y(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new y(e.headers)),this.method=(r=e.method||this.method||"GET",n=r.toUpperCase(),_.indexOf(n)>-1?n:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(o),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==e.cache&&"no-cache"!==e.cache)){var i=/([?&])_=[^&]*/;if(i.test(this.url))this.url=this.url.replace(i,"$1_="+(new Date).getTime());else{this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}}function O(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}})),e}function T(t,e){if(!(this instanceof T))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText=void 0===e.statusText?"":""+e.statusText,this.headers=new y(e.headers),this.url=e.url||"",this._initBody(t)}E.prototype.clone=function(){return new E(this,{body:this._bodyInit})},g.call(E.prototype),g.call(T.prototype),T.prototype.clone=function(){return new T(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new y(this.headers),url:this.url})},T.error=function(){var t=new T(null,{status:0,statusText:""});return t.type="error",t};var A=[301,302,303,307,308];T.redirect=function(t,e){if(-1===A.indexOf(e))throw new RangeError("Invalid status code");return new T(null,{status:e,headers:{location:t}})};var x=o.DOMException;try{new x}catch(t){(x=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack}).prototype=Object.create(Error.prototype),x.prototype.constructor=x}function j(t,e){return new Promise((function(r,n){var i=new E(t,e);if(i.signal&&i.signal.aborted)return n(new x("Aborted","AbortError"));var s=new XMLHttpRequest;function u(){s.abort()}s.onload=function(){var t,e,n={status:s.status,statusText:s.statusText,headers:(t=s.getAllResponseHeaders()||"",e=new y,t.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(t){return 0===t.indexOf("\n")?t.substr(1,t.length):t})).forEach((function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}})),e)};n.url="responseURL"in s?s.responseURL:n.headers.get("X-Request-URL");var o="response"in s?s.response:s.responseText;setTimeout((function(){r(new T(o,n))}),0)},s.onerror=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},s.ontimeout=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},s.onabort=function(){setTimeout((function(){n(new x("Aborted","AbortError"))}),0)},s.open(i.method,function(t){try{return""===t&&o.location.href?o.location.href:t}catch(e){return t}}(i.url),!0),"include"===i.credentials?s.withCredentials=!0:"omit"===i.credentials&&(s.withCredentials=!1),"responseType"in s&&(a?s.responseType="blob":c&&i.headers.get("Content-Type")&&-1!==i.headers.get("Content-Type").indexOf("application/octet-stream")&&(s.responseType="arraybuffer")),!e||"object"!=typeof e.headers||e.headers instanceof y?i.headers.forEach((function(t,e){s.setRequestHeader(e,t)})):Object.getOwnPropertyNames(e.headers).forEach((function(t){s.setRequestHeader(t,l(e.headers[t]))})),i.signal&&(i.signal.addEventListener("abort",u),s.onreadystatechange=function(){4===s.readyState&&i.signal.removeEventListener("abort",u)}),s.send(void 0===i._bodyInit?null:i._bodyInit)}))}j.polyfill=!0,o.fetch||(o.fetch=j,o.Headers=y,o.Request=E,o.Response=T),self.fetch.bind(self);var B=function(t){return t.status>=400?Promise.reject(t):Promise.resolve(t)},P=function(t){try{return t.json().catch((function(){return Promise.reject(t)}))}catch(e){return Promise.reject(t)}},U=function(t,e){void 0===e&&(e={});var r=e.headers,o=void 0===r?{}:r,i=e.method,s=void 0===i?"GET":i,a=e.mode,u=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]])}return r}(e,["headers","method","mode"]),c=o;"GET"!==s&&(c=n({"Content-Type":"application/json"},o));var h=n({method:s,mode:a,headers:c,credentials:"cors"===a?"include":"same-origin"},u);return fetch(t,h).then(B).then(P)},S=function(t){if(!t.error)return null;var e={error:t.error,description:t.error_description};return function(t){return!(!t.error_detail||!t.error_detail.ARGUMENTS_ERROR)}(t)&&(e=n(n({},e),{argumentErrors:t.error_detail.ARGUMENTS_ERROR})),e},R=function(t){return new Promise((function(e,r){P(t).then((function(e){return r({response:t,parsedError:S(e)})})).catch((function(){return r({response:t})}))}))},D=/_\w/g,$=function(t){return Object.keys(t).reduce((function(e,r){var o,i=t[r],s=r.replace(D,(function(t){return t[1].toUpperCase()}));return i&&"object"==typeof i&&!Array.isArray(i)&&(i=$(i)),n(n({},e),((o={})[s]=i,o))}),{})},I=function(t){var e,r;this.request=(e=t,r=[$],function(t,n){return e(t,n).then((function(t){return r.reduce((function(e,r){return r(t)}),t)}))})},k=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.me=function(){return this.request("/users/me/")},e.prototype.get=function(t){return this.request("/users/"+t+"/")},e}(I),C=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.getByUser=function(t){return this.request("/users/"+t+"/organizations/")},e}(I),F=function(t,e){return function(r,o){void 0===o&&(o={});var i=""+t+r,s=o;return e&&(s=n(n({},s),{headers:n(n({},s.headers||{}),{Authorization:"Bearer "+e})})),function(t,e){return U(t,e).catch(R)}(i,s)}};t.CONTINUATION_KEY="continuation",t.PAGE_KEY="page",t.default=function(t){var e=void 0===t?{}:t,r=e.baseUrl,n=void 0===r?"https://www.eventbriteapi.com/v3":r,o=e.token,i=F(n,o);return{request:i,users:new k(i),organizations:new C(i)}},Object.defineProperty(t,"__esModule",{value:!0})}(e)},181:t=>{"use strict";t.exports=JSON.parse('{"eventbrite":{"apiKey":"W3FSQMF7EVKDAVTFLSQ7","organisationId":"692490325123"}}')}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=r(600),e=r.n(t);const n=r(181).eventbrite,o=e()({token:n.apiKey}),i={113:"community",119:"private"},s={year:"numeric",month:"short",day:"numeric"},a=t=>({name:t.name.text,description:t.description.html,img:t.logo?t.logo.url:void 0,sessions:[u(t)],venue:t.venue}),u=t=>{const e=new Date(t.start.local),r=new Date(t.end.local),n=t.ticket_availability,o=t=>t<10?"0"+t:t;return{date:e.toLocaleDateString("en-GB",s),start:`${e.getHours()}:${o(e.getMinutes())}`,end:`${r.getHours()}:${o(r.getMinutes())}`,url:t.url,price:n.minimum_ticket_price.display==n.maximum_ticket_price.display?n.minimum_ticket_price.display:void 0,priceMin:n.minimum_ticket_price.display,priceMax:n.maximum_ticket_price.display}},c=async(t,e)=>{const r=await o.request(`/events/${e.id}/structured_content/`);t.extraContent=r.modules?r.modules.filter((t=>t.data.body.text)).reduce(((t,e)=>t+e.data.body.text),""):""};(async()=>{try{var t=(await o.request(`/organizations/${n.organisationId}/events/?status=draft,live,started,ended,completed&expand=venue,ticket_availability`)).events}catch(t){console.log(`api request failed : ${t.parsedError.description}`)}const e=Object.values(i).reduce(((t,e)=>(t[e]={},t)),{}),r=[];for(const n of t){const t=e[i[n.category_id]];t[n.series_id]?t[n.series_id].sessions.push(u(n)):(t[n.series_id]=a(n),r.push(c(t[n.series_id],n)))}await Promise.all(r),Object.values(i).forEach((t=>{if(e[t]){let r="";Object.values(e[t]).forEach((t=>{r+=(t=>{let e="";e+="<article>",t.img&&(e+=`<img src="${t.img}">`),e+=`<h4>${t.name}</h4>`,e+=`<p>${t.description}</p>`,e+=t.extraContent,e+='<div class="event-details">',e+=`<h5>Location : </h5> <p><a href="http://maps.google.com?q=${t.venue.latitude},${t.venue.longitude}" target="new">${t.venue.name}</a></p>`,e+="<h5>Sessions : </h5> <ul>";for(let r=0;r<t.sessions.length;r++){const n=t.sessions[r],o=`${n.date} | ${n.start} - ${n.end} `,i=n.price?n.price:`${n.priceMin} to ${n.priceMax}`;e+=`<li>${o} <a href="${n.url}" target="new" class="button">Book on Eventbrite (${i})</a></li>`}return e+="</ul>",e+="<div>",e+="</article>",e})(t)}));const n=document.getElementById(`${t}-sessions`);n.getElementsByClassName("article-grid")[0].innerHTML=r,n.classList.remove("workshop-list-empty")}}))})()})()})();