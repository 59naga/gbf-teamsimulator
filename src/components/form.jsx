import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { elements, weapons, rarities, races } from '../defines';
import AllCheckbox from './all-checkbox';
import Checkbox from './checkbox';

class Form extends React.Component {
  handleReset() {
    this.props.dispatch(push('/'));
  }
  render() {
    return (
      <form>
        <ul>
          <li>
            <AllCheckbox label="Rarity" type="rarity" value={rarities.join(SEPARATOR)} />
            {rarities.map(value => <Checkbox type="rarity" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Element" type="element" value={elements.join(SEPARATOR)} />
            {elements.map(value => <Checkbox type="element" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Speciality" type="weapon" value={weapons.join(SEPARATOR)} />
            {weapons.map(value => <Checkbox type="weapon" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Race" type="race" value={races.join(SEPARATOR)} />
            {races.map(value => <Checkbox type="race" key={value} value={value} />)}
          </li>
        </ul>
        <footer>
          <button onClick={() => { this.handleReset(); }}>All Reset</button>
          {this.props.label}
        </footer>
      </form>
    );
  }
}
Form.propTypes = {
  label: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({}))(Form);
