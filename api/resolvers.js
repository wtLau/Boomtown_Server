import fetch from 'node-fetch';
import { getItems, getItem, getUsers, getUser, getItemOwner, getBorrowed } from './jsonServer.js';

const resolveFunctions = {
  Query: {
    items() {
      return getItems();
    },

    item(root, { id }) {
      return getItem(id)
    },

    users(){
      return getUsers()
    },

    user(root, { id }) {
      return getUser(id)
    }
  },

  Item: {
    // getting itemOwner from users
    itemOwner(item) {
      return getUser(item.itemOwner);
    },
    //getting borrower  from users
    borrower(item){
      if (!item.borrower) return null;
      return getUser(item.borrower);
    }
  },

  User: {
    items(user, args, context){
      // return getUserOwnItem(user.id)
      return context.loaders.UserOwnItem.load(user.id)
    },
    borrowed(user){
      return getBorrowed(user.id)
    }
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
      return postNewItem();
    }
  }
};

export default resolveFunctions;