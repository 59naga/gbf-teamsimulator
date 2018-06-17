import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _filter from 'lodash.filter';

import ReactModal from 'react-modal';

import { elements, weapons, rarities, races } from '../defines';
import AllCheckbox from './all-checkbox';
import Checkbox from './checkbox';

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
    this.state = { showModal: true };
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
          <h1>GBF TEAM SIMULATOR v0.0.1</h1>
          <footer>
            <button onClick={this.handleOpenModal}>○ Open Search</button>
          </footer>
        </header>
        <ReactModal
          isOpen={this.state.showModal}
          ariaHideApp={false}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <form>
            <header>
              <button onClick={this.handleCloseModal}>☓ Close Search</button>
            </header>
            <h2>Rarity</h2>
            <div>
              <AllCheckbox type="rarity" value={rarities.join(',')} />
              {rarities.map(value => <Checkbox type="rarity" key={value} value={value} />)}
            </div>
            <h2>Element</h2>
            <div>
              <AllCheckbox type="element" value={elements.join(',')} />
              {elements.map(value => <Checkbox type="element" key={value} value={value} />)}
            </div>
            <h2>Weapon</h2>
            <div>
              <AllCheckbox type="weapon" value={weapons.join(',')} />
              {weapons.map(value => <Checkbox type="weapon" key={value} value={value} />)}
            </div>
            <h2>Race</h2>
            <div>
              <AllCheckbox type="race" value={races.join(',')} />
              {races.map(value => <Checkbox type="race" key={value} value={value} />)}
            </div>
            <footer>{found.length ? `${found.length} character found` : 'no results found'}</footer>
          </form>
        </ReactModal>
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
