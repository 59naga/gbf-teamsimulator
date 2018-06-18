import { createStore, compose } from 'redux';
import update from 'react-addons-update';
import characters from '../gbf.wiki-data/dist/chars.json';

import { rarities, races } from './defines';

function getAliases(data) {
  const aliases = {};
  data.forEach((chara) => {
    if (chara.char_id) {
      if (aliases[chara.char_id] === undefined) {
        aliases[chara.char_id] = [];
      }
      aliases[chara.char_id].push(chara.id);
    }
  });
  return aliases;
}

const initialState = {
  aliases: getAliases(characters),
  characters,
  query: {
    rarity: rarities.join(','),
    element: 'Fire',
    weapon: 'Sabre',
    race: races.join(','),
    team: '',
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
