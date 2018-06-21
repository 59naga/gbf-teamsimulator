import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import axios from 'axios';
import _filter from 'lodash.filter';
import _find from 'lodash.find';
import upperCase from 'upper-case';

import Modal from './modal';
import Form from './form';
import Character from './checkbox-character';

const title = `${upperCase(NAME).replace(/-/g, ' ')} v${VERSION}`;
function getChosen(query = {}) {
  return {
    elements: query.element ? query.element.split(SEPARATOR) : [],
    weapons: query.weapon ? query.weapon.split(SEPARATOR) : [],
    rarities: query.rarity ? query.rarity.split(SEPARATOR) : [],
    races: query.race ? query.race.split(SEPARATOR) : [],
    styles: query.style ? query.style.split(SEPARATOR) : [],
    team: query.team ? query.team.split(SEPARATOR) : [],
  };
}

class List extends React.Component {
  componentWillMount() {
    axios('https://gitcdn.xyz/cdn/59naga/gbf.wiki-data/master/dist/chars.json').then(({ data: payload }) => {
      this.props.dispatch({ type: 'INIT', payload });
    });
  }
  render() {
    const chosen = getChosen(this.props.query);

    const found = [];
    this.props.characters.forEach((char) => {
      if (!char.name) {
        return;
      }

      if (chosen.rarities.indexOf(char.rarity) === -1) {
        return;
      }
      if (chosen.elements.indexOf(char.element) === -1) {
        return;
      }
      if (!_filter(chosen.weapons, (value => char.specialty.match(value))).join('')) {
        return;
      }
      if (chosen.races.indexOf(char.race) === -1) {
        return;
      }
      if (chosen.styles.indexOf(char.style) === -1) {
        return;
      }
      if (!char.name) {
        return;
      }
      found.push(char);
    });
    let label = 'now loading...';
    let team = [];
    let names = [];
    let href = '';
    if (this.props.initialized) {
      const isEn = this.props.i18n.language === 'en';
      const nameField = isEn ? 'name_en' : 'name';
      const nameSeparator = isEn ? ', ' : '、';
      const hashtag = isEn ? 'GBFTS' : '推し編成的ななにか';

      label = found.length ? `${found.length} character found` : 'no results found';
      team = chosen.team.map(id => _find(this.props.characters, (item => item.id === id)));
      names = team.map(char => `${char.rarity}${isEn ? ' ' : ''}${char[nameField]}`).join(nameSeparator);

      // TODO: URLが長すぎて平文がほとんど入らない
      const text = this.props.t('team.tweet');
      // const limit = 20;
      // let text = `${this.props.t('team.tweet')} ${names}`;
      // if (text.length + hashtag.length > limit) {
      //   text = `${text.slice(0, limit + hashtag.length)}…`;
      // }

      href = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}&url=${encodeURIComponent(location.href)}`;
    }

    return (
      <div id="simulator">
        <header id="banner">
          <h1>
            <button onClick={() => {
                this.modal.getWrappedInstance().getWrappedInstance().handleOpenModal();
              }}
            >
              {title}
            </button>
          </h1>
        </header>
        <Modal ref={(modal) => { this.modal = modal; }} title={title} />
        <Form label={label} />
        <section>
          {
            found.length ?
              <ul>
                {
                  found.map(char => (
                    <li key={char.id}>
                      <Character char={char} />
                    </li>
                  ))
                }
              </ul>
            : undefined
          }
        </section>
        {
          team.length ?
            <div className="team">
              <section>
                <header>
                  <h1>{this.props.t('team.label')}</h1>
                  <a href={href} target="_blank" rel="noreferrer noopener">{this.props.t('team.share')}</a>
                </header>
                {team.map(char => (
                  <img
                    key={char.id}
                    src={`http://game-a.granbluefantasy.jp/assets_en/img_light/sp/assets/npc/f/${char.id}_01.jpg`}
                    title={`${char.name} ${char.released}`}
                    alt={char.name}
                  />
                ))}
              </section>
            </div>
          : undefined
        }
      </div>
    );
  }
}
List.propTypes = {
  initialized: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  characters: PropTypes.arrayOf(PropTypes.shape).isRequired,
  query: PropTypes.shape({
    element: PropTypes.string,
    weapon: PropTypes.string,
    rarity: PropTypes.string,
  }),
};
List.defaultProps = {
  query: {},
};

export default connect(state => state)(translate()(List));
