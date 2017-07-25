import DataLoader from 'dataloader';
import { getUserOwnItem } from './jsonServer';

export default function() {
  return {
    UserOwnItem: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserOwnItem(id)))
    ))
  }
}