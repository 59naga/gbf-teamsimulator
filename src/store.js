import { createStore, compose } from 'redux';
import update from 'react-addons-update';
import characters from '../gbf.wiki-data/dist/characters.json';

import { rarities, races } from './defines';

const initialState = {
  characters,
  query: {
    rarity: rarities.join(','),
    element: 'Fire',
    weapon: 'Sabre',
    race: races.join(','),
  },
};

export default createStore((state, { type, payload, error }) => {
  if (error) throw error;
  switch (type) {
    case 'QUERY':
      return update(state, { query: { $set: Object.assign({}, state.query, payload) } });
    default:
      return state;
  }
}, initialState, compose());
