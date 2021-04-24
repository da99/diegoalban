
import { constant_time_compare, json_200, json_404, inspect_error, inspect } from "./Utils";


addEventListener("fetch", (event : FetchEvent) => {
  return event.respondWith(handleRequest(event));
});

async function handleRequest(event : FetchEvent) {
  const request = event.request;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  switch(`${method} ${path}`) {
    case "GET /quarry/clients":
      var results = await MM.get_quarry_clients();
      if (results.error === true) {
        return json_404(results);
      } else {
        var value = JSON.parse(results.value);
        var clients = value.clients;
        return json_200({error: clients.length === 0, updated_at: value.updated_at, msg: "ok", data: clients});
      }
    break;

    case "POST /quarry/clients":
      var client_key = request.headers.get("X-SECRET-KEY") || "";

      if (!constant_time_compare(MY_BDRM_KEY, client_key)) {
        return json_404({error: "Not Found"});
      }

      var raw = await request.text();
      var result = await MM.update_quarry_clients(raw);
      return json_200({error: !result, msg: "ok", data: result});
    break;

    case "GET /":
      return get_asset("/sections/homepage/index.html", event);
      break;

    case "GET /da99":
      return get_asset("/sections/da99/index.html", event);
      break;

    default:
      try {
        return await getAssetFromKV(event);
      } catch (e) {
        if (request.method === "POST") {
          return(new Response(JSON.stringify({error: true, msg: "not found"}), {
            headers: { 'content-type': "application/json; charset=UTF-8" },
            status: 404,
            statusText: "not found"
          }));
        } else {
          let not_found = await getAssetFromKV(event, {
            mapRequestToAsset: (req) => {
              return new Request(`${(new URL(req.url)).origin}/404.html`, req);
            }
          });
          return(new Response(not_found.body, { ...not_found, status: 404 }));
        } // if/else
      } // try catch
  } // switch

} // function
