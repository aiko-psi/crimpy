const baseRoute = "http://localhost:3002";

export function fetchBackend<T>(routeId: string): Promise<T | null> {
  const route = baseRoute + routeId;
  return fetch(route, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json as T;
    })
    .catch((error) => {
      console.error(`Error with url ${route} with error ${error}`);
      return null;
    });
}
