import fetch from 'node-fetch';

const resolveFunctions = {
  Query: {
    items() {
      return fetch(`http://localhost:3001/items`)
        .then(response => response.json())
        .catch(errors => console.log(errors))
    },
    item(root, { id }) {
      return fetch(`http://localhost:3001/items/${id}`)
        .then(response => response.json())
        .catch(errors => console.log(errors))
    },
    users(){
      return fetch(`http://localhost:3001/users`)
        .then(response => response.json())
        .catch(errors => console.log(errors))
    },
    user(root, { id }) {
      return fetch(`http://localhost:3001/users/${id}`)
        .then(response => response.json())
        .catch(errors => console.log(errors))
    }
  },
  Item: {
    itemOwner(item) {
      return fetch(`http://localhost:3001/items/${item.itemOwner}`)
      .then (response => response.json()
      .catch(errors => console.log(errors))
    )},
    borrower(item){
      return fetch(`http://localhost:3001/items/${item.borrower}`)
      .then (response => response.json()
      .catch(errors => console.log(errors))
    )}
  },
  User: {
    items(user){
      return fetch(`http://localhost:3001/items/?itemOwner=${user.id}`)
      .then (response => response.json()
      .catch(errors => console.log(errors))
    )},
    borrowed(user){
      return fetch(`http://localhost:3001/items/?borrower=${user.id}`)
      .then (response => response.json()
      .catch(errors => console.log(errors))
    )}
  }
};
export default resolveFunctions;