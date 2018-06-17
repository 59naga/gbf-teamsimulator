import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _filter from 'lodash.filter';

import upperCase from 'upper-case';
import ReactModal from 'react-modal';

import { elements, weapons, rarities, races } from '../defines';
import AllCheckbox from './all-checkbox';
import Checkbox from './checkbox';

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
  constructor() {
    super();
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
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
          <h1><button onClick={this.handleOpenModal}>{title}</button></h1>
        </header>
        <ReactModal
          ariaHideApp={false}
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <header>
            <button onClick={this.handleCloseModal}>☓ Close</button>
            <h1>{title}</h1>
            <p>得意武器検索めんどくさいから作った</p>
            <p>
              開発者:
              <a href="https://twitter.com/horse_n_game" target="_blank" rel="noreferrer noopener">ゴブロのケツ（獄長）</a>
              ／
              <a href="https://github.com/59naga/gbf-teamsimulator" target="_blank" rel="noreferrer noopener">github</a>
            </p>
          </header>
        </ReactModal>
        <form>
          <ul>
            <li>
              <AllCheckbox label="Rarity" type="rarity" value={rarities.join(',')} />
              {rarities.map(value => <Checkbox type="rarity" key={value} value={value} />)}
            </li>
            <li>
              <AllCheckbox label="Element" type="element" value={elements.join(',')} />
              {elements.map(value => <Checkbox type="element" key={value} value={value} />)}
            </li>
            <li>
              <AllCheckbox label="Speciality" type="weapon" value={weapons.join(',')} />
              {weapons.map(value => <Checkbox type="weapon" key={value} value={value} />)}
            </li>
            <li>
              <AllCheckbox label="Race" type="race" value={races.join(',')} />
              {races.map(value => <Checkbox type="race" key={value} value={value} />)}
            </li>
          </ul>
          <footer>{found.length ? `${found.length} character found` : 'no results found'}</footer>
        </form>
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
