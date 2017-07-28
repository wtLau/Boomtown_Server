import fetch from 'node-fetch';
import pool from '../database/index'
import { getUsers, getItems, getItem, createUser, getUserOwnItem, getBorrowed, getItemAllTags, postNewItem } from './postgresDB';


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
    tags(item, args, context) {
      return getItemAllTags(item.id);
    },
    itemowner(item, args, context) {
      return context.loaders.getUser.load(item.itemowner);
    },
    borrower(item, args, context){
      if (!item.borrower) return null;
      return context.loaders.getUser.load(item.borrower);
    }
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
      return postNewItem(args);
    },
    addUser(root, args, context) {
      return createUser(args, context)
    }
  }
};

export default resolveFunctions; 