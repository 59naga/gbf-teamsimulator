import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _filter from 'lodash.filter';
import upperCase from 'upper-case';

import Modal from './modal';
import Form from './form';

const title = `${upperCase(NAME).replace(/-/g, ' ')} v${VERSION}`;
function getChosen(query = {}) {
  return {
    elements: query.element ? query.element.split(',') : [],
    weapons: query.weapon ? query.weapon.split(',') : [],
    rarities: query.rarity ? query.rarity.split(',') : [],
    races: query.race ? query.race.split(',') : [],
  };
}

class List extends React.Component {
  render() {
    const chosen = getChosen(this.props.query);

    const found = [];
    this.props.characters.forEach((chara) => {
      if (!chara.name) {
        return;
      }

      if (chosen.rarities.indexOf(chara.rarity) === -1) {
        return;
      }
      if (chosen.elements.indexOf(chara.element) === -1) {
        return;
      }
      if (!_filter(chosen.weapons, (value => chara.specialty.match(value))).join('')) {
        return;
      }
      if (chosen.races.indexOf(chara.race) === -1) {
        return;
      }
      if (!chara.name) {
        return;
      }
      found.push(chara);
    });

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
        <Form label={found.length ? `${found.length} character found` : 'no results found'} />
        <section>
          {
            found.length ?
              <ul>
                {
                  found.map(chara => (
                    <li key={chara.id}>
                      <a href={`https://gbf.wiki/${chara.name_wiki}`} target="_blank" rel="noreferrer noopener">
                        <img
                          src={`http://game-a.granbluefantasy.jp/assets/img_light/sp/assets/npc/m/${chara.id}_01.jpg`}
                          title={`${chara.name} ${chara.released}`}
                          alt={chara.name}
                        />
                      </a>
                    </li>
                  ))
                }
              </ul>
            : undefined
          }
        </section>
      </div>
    );
  }
}
List.propTypes = {
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
