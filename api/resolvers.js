import fetch from 'node-fetch';
import pool from '../database/index'
import { getUsers, getItems, getUser, getItem, createUser, getUserOwnItem, getBorrowed } from './postgresDB';


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
    itemowner(item, args, context) {
      return context.loaders.getUser.load(item.itemowner);
    },
    borrower(item, args, context){
      if (!item.borrower) return null;
      return context.loaders.getUser.load(item.borrower);
    },
    // tags: ()
  },

  User: {
    items(user, args, context){
      return context.loaders.getUserOwnItem.load(user.id)
    },
    borrowed(user, args, context){
      return context.loaders.getBorrowed.load(user.id)
    }
  },

  Mutation: {
    addItem(root, args) {
      const newItem = {
        title: args.title,
        description: args.description,
        imageurl: args.imageurl,
        tags: args.tags,
        itemowner: args.itemowner,
        createdOn: Math.floor(Date.now() / 1000),
        available: true,
        borrower: null
      };
      return postNewItem();
    },
    addUser(root, args, context) {
      return createUser(args, context)
    }
  }
};

export default resolveFunctions; 