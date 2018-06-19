import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    team: query.team ? query.team.split(SEPARATOR) : [],
  };
}

class List extends React.Component {
  componentWillMount() {
    axios('https://gitcdn.xyz/repo/59naga/gbf.wiki-data/master/dist/chars.json').then(({ data: payload }) => {
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
      label = found.length ? `${found.length} character found` : 'no results found';
      team = chosen.team.map(id => _find(this.props.characters, (item => item.id === id)));
      names = team.map(char => `${char.rarity}${char.name}`).join('、');
      href = `https://twitter.com/intent/tweet?text=グラブルの推し編成はこちら！ ${names}／${title}&hashtags=推し編成的ななにか&url=${encodeURIComponent(location.href)}`;
    }

    return (
      <div id="simulator">
        <header id="banner">
          <h1>
            <button onClick={() => { this.modal.getWrappedInstance().handleOpenModal(); }}>
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
                  <h1>MY TEAM</h1>
                  <a href={href} target="_blank" rel="noreferrer noopener">Share this</a>
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

export default connect(state => state)(List);
