import _filter from 'lodash.filter';
import _find from 'lodash.find';

import i18n from '../i18n';

export default null;
export function findCharacters(characters, query = {}) {
  const elements = query.element ? query.element.split(SEPARATOR) : [];
  const weapons = query.weapon ? query.weapon.split(SEPARATOR) : [];
  const rarities = query.rarity ? query.rarity.split(SEPARATOR) : [];
  const races = query.race ? query.race.split(SEPARATOR) : [];
  const styles = query.style ? query.style.split(SEPARATOR) : [];

  const found = [];
  characters.forEach((char) => {
    if (!char.name) {
      return;
    }

    if (rarities.indexOf(char.rarity) === -1) {
      return;
    }
    if (elements.indexOf(char.element) === -1) {
      return;
    }
    if (!_filter(weapons, (value => char.specialty.match(value))).join('')) {
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

export function getTeam(characters, team = '') {
  const found = [];

  team.split(SEPARATOR).forEach((id) => {
    const char = _find(characters, (item => item.id === id));
    if (char) {
      found.push(char);
    }
  });

  return found;
}

export function getShareUrl(team = []) {
  const isEn = i18n.language === 'en';

  const nameField = isEn ? 'name_en' : 'name';
  const nameSeparator = isEn ? ', ' : '、';
  const names = team.map(char => `${char.rarity}${isEn ? ' ' : ''}${char[nameField]}`).join(nameSeparator);

  // TODO: URLが長すぎて平文がほとんど入らない
  const text = i18n.t('team.tweet');
  // const limit = 20;
  // let text = `${this.props.t('team.tweet')} ${names}`;
  // if (text.length + hashtag.length > limit) {
  //   text = `${text.slice(0, limit + hashtag.length)}…`;
  // }

  const hashtag = isEn ? 'GBFTS' : '推し編成的ななにか';
  const url = encodeURIComponent(window.location.href);

  return `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}&url=${url}`;
}
