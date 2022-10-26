import { session } from "../store/session";

const API_ENDPOINT = 'http://localhost:3000/v1/';

const $handle = async (res: Response) => {
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

const $fetchQuery = (endpoint: string, query: Record<string, unknown>, method: string): Promise<any> => {
  const q = Object.entries(query).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
  const url = API_ENDPOINT + endpoint + (q ? '?' + q : '');
  const headers: HeadersInit = session.token ? {
    'Authorization': `Bearer ${session.token}`,
    'Content-Type': 'application/json',
  } : {};
  return fetch(url, {
    method,
    headers,
  }).then($handle);
};

const $fetchBody = (endpoint: string, body: Record<string, unknown>, method: string): Promise<any> => {
  const bodyJson = JSON.stringify(body);
  const url = API_ENDPOINT + endpoint;
  const headers: HeadersInit = session.token ? {
    'Authorization': `Bearer ${session.token}`,
    'Content-Type': 'application/json',
  } : {};
  return fetch(url, {
    headers,
    method: method,
    body: bodyJson,
  }).then($handle);
};

export const $get = <T = unknown>(endpoint: string, query: Record<string, unknown> = {}): Promise<T> => $fetchQuery(endpoint, query, 'GET');
export const $post = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'POST');
export const $delete = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'DELETE');
export const $put = <T = unknown>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> => $fetchBody(endpoint, body, 'PUT');