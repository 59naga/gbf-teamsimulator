// @flow
declare var SEPARATOR: string;

declare type Char = {
  id: string,
  char_id: string,
  name: string,
  name_en: string,
  name_wiki: string,
  rarity: string,
  element: string,
  specialty: string,
  race: string,
  style: string,
  released: string,
};

declare type State = {
  query?: any,
};

declare type Action = {
  type: string,
  payload: any,
  error?: Object,
};
