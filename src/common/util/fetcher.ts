export const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return res.json();
  });
