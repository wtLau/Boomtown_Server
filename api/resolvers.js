import fetch from 'node-fetch';
import * from './jsonServer';

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
      return fetch(`http://localhost:3001/users/${item.itemOwner}`)
      .then (response => response.json()
      .catch(errors => console.log(errors))
    )},
    borrower(item){
      if (!item.borrower) return null;
      return fetch(`http://localhost:3001/users/${item.borrower}`)
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
  },
  Mutation: {
    addItem(root, args) {
      const newItem = {
        title: args.title,
        description: args.description,
        imageUrl: args.imageUrl,
        tags: args.tags,
        itemOwner: args.itemOwner,
        createdOn: Math.floor(Date.now() / 1000),
        available: true,
        borrower: null
      };
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
  }
};
export default resolveFunctions;