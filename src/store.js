import { createStore, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { parse } from 'querystring';
import update from 'react-addons-update';

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
  initialized: false,
  aliases: [],
  characters: [],
  query: {
    rarity: rarities.join(SEPARATOR),
    element: 'Fire',
    weapon: 'Sabre',
    race: races.join(SEPARATOR),
    team: '',
  },
};

export const history = createHashHistory();
export default createStore((state, { type, payload = {}, error }) => {
  if (error) throw error;

  const search = payload.search ? parse(payload.search.slice(1)) : undefined;
  switch (type) {
    case '@@router/LOCATION_CHANGE':
      if (search) {
        return update(state, { query: { $set: Object.assign({}, state.query, search) } });
      }
      return update(state, { query: { $set: Object.assign({}, state.query, initialState.query) } });
    case 'INIT':
      return update(state, {
        initialized: { $set: true },
        aliases: { $set: getAliases(payload) },
        characters: { $set: payload },
      });
    case 'QUERY':
      return update(state, { query: { $set: Object.assign({}, state.query, payload) } });
    default:
      return state;
  }
}, initialState, applyMiddleware(routerMiddleware(history)));
