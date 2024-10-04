const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:8080';

const fetcher = async (url: string, req: RequestInit) => {
  const headers = { 'Content-Type': 'application/json;charset=UTF-8' };

  const response = await fetch(BASE_URL + '/api' + url, {
    ...req,
    headers,
  });

  if (!response.ok) {
    throw new Error('API Error');
  }

  return await response.json();
};


export const https = {
  get: (url: string) =>
    fetcher(url, {
      method: 'GET',
    }),
  post: (url: string, data: any) =>
    fetcher(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: (url: string, data: any) =>
    fetcher(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (url: string) =>
    fetcher(url, {
      method: 'DELETE',
    }),
};
