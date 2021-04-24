
export function constant_time_compare(a : string, b : string) {
  let result = 0;
  let a_length = a.length;
  for(let i = 0; i < a_length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  // Leave length comparison for last
  // or else attacker will know the length of target.
  result |= a.length ^ b.length;
  return result === 0;
}; // function

export function json_200(x : object) {
  return new Response(
    JSON.stringify(x),
    {
      headers: { 'content-type': "application/json; charset=UTF-8" },
      status: 200,
      statusText: "found"
    }
  );
} // function

export function json_404(x : object) {
  return new Response(
    JSON.stringify(x),
    {
      headers: { 'content-type': "application/json; charset=UTF-8" },
      status: 404,
      statusText: "not found"
    }
  );
} // function

export function inspect_error(e : any) {
  console.log(e.name, e.message, e.toString(), e.code, e.stack);
  return e;
}

export function inspect(e : any) {
  console.log(JSON.stringify(e));
}
