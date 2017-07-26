import fetch from 'node-fetch';
import { getItems, getUsers, getItemOwner, getBorrowed } from './jsonServer.js';
import pool from '../database/index'

const resolveFunctions = {
  Query: {
    items() {
      return getItems();
    },

    item(root, { id }, context) {
      return context.loaders.getItem.load(id)
    },

    users(){
      return getUsers()
    },

    user(root, { id }, context) {
      return context.loaders.getUser.load(id);
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