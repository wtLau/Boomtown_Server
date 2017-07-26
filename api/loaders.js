import DataLoader from 'dataloader';
import { getUserOwnItem, getBorrowed } from './jsonServer';
import { getUser, getItem } from './postgresDB';

export default function() {
  return {
    UserOwnItem: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserOwnItem(id)))
    )),
    getBorrowed: new DataLoader(ids => (
      Promise.all(ids.map(id => getBorrowed(id)))
    )),
    getUser: new DataLoader(ids => {
      
      return Promise.all(ids.map(id => getUser(id)))
    }),
    getItem: new DataLoader(ids => (
      Promise.all(ids.map(id => getItem(id)))
    ))
  }
}