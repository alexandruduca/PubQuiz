import axios from 'axios';

export const getRequest = (url: string, params?: { [key: string]: unknown }) =>
  axios
    .get(url, { params, withCredentials: true })
    .then((response) => ({ response: response.data }))
    .catch((error) => ({ error: error.response.data }));

export const postRequest = (url: string, payload: { [key: string]: unknown }) =>
  axios
    .post(url, payload, { withCredentials: true })
    .then((response) => ({ response: response.data }))
    .catch((error) => ({ error: error.response.data }));

export const putRequest = (url: string, payload: { [key: string]: unknown }) =>
  axios
    .put(url, payload, { withCredentials: true })
    .then((response) => ({ response: response.data }))
    .catch((error) => ({ error: error.response.data }));

export const patchRequest = (url: string, payload?: { [key: string]: unknown }) =>
  axios
    .patch(url, payload, { withCredentials: true })
    .then((response) => ({ response: response.data }))
    .catch((error) => ({ error: error.response.data }));

export const deleteRequest = (url: string, payload: { [key: string]: unknown }) =>
  axios
    .delete(url, { data: payload, withCredentials: true })
    .then((response) => ({ response: response.data }))
    .catch((error) => ({ error: error.response.data }));
