"use strict";
addEventListener("fetch", event => {
    return event.respondWith(new Response("Hello world"));
});
