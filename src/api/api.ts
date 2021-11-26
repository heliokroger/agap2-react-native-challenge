export const requestAPI = async <T>(path: string, method: string) => {
  const response = await fetch(`https://api.tvmaze.com${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data as T;
  }

  throw new Error(`Request failed with status ${response.status}.`);
};
