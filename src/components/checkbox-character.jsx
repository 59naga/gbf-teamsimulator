import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';

import _xor from 'lodash.xor';

import { CheckboxContainer, Checkbox, Thumbnail } from './_styles';

// char_idが同じキャラは同時に編成に入れられないため、クリック時に弾く

class Character extends React.Component {
  handleCheck() {
    const { query, char, dispatch } = this.props;
    const data = query.team ? query.team.split(SEPARATOR) : [];
    const value = data.reduce((prev, id) => {
      const aliases = this.props.aliases[char.char_id] || [];
      const aliased = aliases.indexOf(id);
      if (aliased > -1) {
        return aliases[aliased];
      }
      return prev;
    }, char.id);

    // 満員
    const afterValue = _xor(data, [value]);
    if (afterValue.length > 5) {
      return;
    }

    const payload = { team: afterValue.join(SEPARATOR) };
    dispatch(push(`/?${stringify(Object.assign(query, payload))}`));
  }
  render() {
    const { query, char } = this.props;
    const data = query.team ? query.team.split(SEPARATOR) : [];

    const componentName = `char_${char.id}`;
    const checked = data.reduce((prev, id) => {
      if (id === char.id) {
        return true;
      }

      // 編成中のキャラと同一のchar_idは編成できない
      const aliases = this.props.aliases[char.char_id] || [];
      if (aliases.indexOf(id) > -1) {
        return true;
      }

      return prev;
    }, false);
    
    return (
      <label htmlFor={componentName}>
        <Checkbox
          id={componentName}
          checked={checked}
          onChange={() => { this.handleCheck(); }}
        />
        <Thumbnail
          checked={checked}
          src={`http://game-a.granbluefantasy.jp/assets/img_light/sp/assets/npc/m/${char.id}_01.jpg`}
          title={`${char.name} ${char.released}`}
          alt={char.name}
        />
      </label>
    );
  }
}
Character.propTypes = {
  query: PropTypes.shape(),
  aliases: PropTypes.shape().isRequired,
  char: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};
Character.defaultProps = {
  query: {},
};

export default connect(state => state)(Character);
