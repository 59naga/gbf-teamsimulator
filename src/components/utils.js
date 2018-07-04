// @flow
import _filter from 'lodash.filter';
import _find from 'lodash.find';

import i18n from '../i18n';

export default null;
export function findCharacters(characters: Array<Char>, query: any = {}): Array<Char> {
  const elements: string[] = query.element ? query.element.split(SEPARATOR) : [];
  const weapons: string[] = query.weapon ? query.weapon.split(SEPARATOR) : [];
  const rarities: string[] = query.rarity ? query.rarity.split(SEPARATOR) : [];
  const races: string[] = query.race ? query.race.split(SEPARATOR) : [];
  const styles: string[] = query.style ? query.style.split(SEPARATOR) : [];

  const found: Array<Char> = [];
  characters.forEach(char => {
    if (!char.name) {
      return;
    }

    if (rarities.indexOf(char.rarity) === -1) {
      return;
    }
    if (elements.indexOf(char.element) === -1) {
      return;
    }
    if (!_filter(weapons, value => char.specialty.match(value)).join('')) {
      return;
    }
    if (races.indexOf(char.race) === -1) {
      return;
    }
    if (styles.indexOf(char.style) === -1) {
      return;
    }
    if (!char.name) {
      return;
    }
    found.push(char);
  });

  return found;
}

export function getTeam(characters: Array<Char>, team: string = ''): Array<Char> {
  const found: Array<Char> = [];

  team.split(SEPARATOR).forEach(id => {
    const char = _find(characters, item => item.id === id);
    if (char) {
      found.push(char);
    }
  });

  return found;
}

export function getShareUrl(team: Array<Char> = []): string {
  const isEn = i18n.language === 'en';

  const nameField = isEn ? 'name_en' : 'name';
  const nameSeparator = isEn ? ', ' : '、';
  const names = team
    .map(char => `${char.rarity}${isEn ? ' ' : ''}${char[nameField]}`)
    .join(nameSeparator);

  // TODO: URLが長すぎて平文がほとんど入らない
  // const limit = 20;
  let text = i18n.t('team.tweet');
  if (false) {
    text = `${i18n.t('team.tweet')} ${names}`;
  }
  // if (text.length + hashtag.length > limit) {
  //   text = `${text.slice(0, limit + hashtag.length)}…`;
  // }

  const hashtag = isEn ? 'GBFTS' : '編成シミュ';
  const url = encodeURIComponent(window.location.href);

  return `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}&url=${url}`;
}
