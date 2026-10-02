export async function onRequest(context) {
  const url = new URL(context.request.url);
  const backendUrl = 'https://agrilogix-api.onrender.com' + url.pathname + url.search;

  const headers = new Headers(context.request.headers);
  headers.set('host', 'agrilogix-api.onrender.com');

  const options = {
    method: context.request.method,
    headers: headers,
    redirect: 'follow',
  };

  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
    options.body = context.request.body;
  }

  return fetch(backendUrl, options);
}
