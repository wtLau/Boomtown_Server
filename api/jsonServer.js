import fetch from 'node-fetch';

// Query helper function
export function getItems () {
  return fetch(`http://localhost:3001/items`)
    .then(response => response.json())
    .catch(errors => console.log(errors))
}

export const getItem = (id) => {
  return fetch(`http://localhost:3001/items/${id}`)
    .then(response => response.json())
    .catch(errors => console.log(errors))
}

export const getUsers = () => {
  return fetch(`http://localhost:3001/users/`)
    .then(response => response.json())
    .catch(errors => console.log(errors))
}

export const getUser = (id) => {
  return fetch(`http://localhost:3001/users/${id}`)
    .then(response => response.json())
    .catch(errors => console.log(errors))
}

export const getUserOwnItem = (id) => {
  return fetch(`http://localhost:3001/items/?itemOwner=${id}`)
    .then (response => response.json())
    .catch(errors => console.log(errors))
}

export const getBorrowed = (id) => {
  return fetch(`http://localhost:3001/items/?borrower=${id}`)
    .then (response => response.json())
    .catch(errors => console.log(errors))
}

export const postNewItem = () => {
  return fetch('http://localhost:3001/items/', {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  .then(response => response.json())
  .catch(errors => console.log(errors))
}