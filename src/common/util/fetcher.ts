type FetcherOptions = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any; // Puedes definir el tipo según tus necesidades, por ejemplo: Record<string, any>
};

export const fetcher = (url: string, token: string, options: FetcherOptions) => {
  const { method, body } = options;

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: method === "POST" || "PATCH"|| "DELETE" ? JSON.stringify(body) : undefined,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return res.json();
  });
};