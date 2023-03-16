const API_URL =`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`

const sendEntryToApi = (data) => {
  return fetch(API_URL + '/create-entry', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.json());
};

const getEntriesFromApi = () => {
  return fetch(API_URL + '/get-entries').then((response) => {
    return response.json();
  });
};

const sendEditedEntryToApi = (data) => {
  return fetch(API_URL + '/update-entry', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  sendEntryToApi: sendEntryToApi,
  sendEditedEntryToApi: sendEditedEntryToApi,
  getEntriesFromApi: getEntriesFromApi,
};

export default objToExport;
