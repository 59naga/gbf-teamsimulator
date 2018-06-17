import React from 'react';
import PropTypes from 'prop-types';

import { elements, weapons, rarities, races } from '../defines';
import AllCheckbox from './all-checkbox';
import Checkbox from './checkbox';

const Form = props => (
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
    <footer>{props.label}</footer>
  </form>
);
Form.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Form;
