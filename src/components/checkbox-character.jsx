import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';

import _xor from 'lodash.xor';

class Character extends React.Component {
  handleCheck() {
    const { query, char } = this.props;
    const data = query.team ? query.team.split(SEPARATOR) : [];
    const value = data.reduce((prev, id) => {
      const aliases = this.props.aliases[char.char_id] || [];
      const aliased = aliases.indexOf(id);
      if (aliased > -1) {
        return aliases[aliased];
      }
      return prev;
    }, char.id);

    const afterValue = _xor(data, [value]);
    if (afterValue.length > 5) {
      return;
    }

    const payload = { team: afterValue.join(SEPARATOR) };
    this.props.dispatch(push(`/?${stringify(Object.assign(query, payload))}`));
  }
  render() {
    const { query, char } = this.props;
    const data = query.team ? query.team.split(SEPARATOR) : [];

    const componentName = `char_${char.id}`;
    return (
      <label htmlFor={componentName}>
        <input
          id={componentName}
          type="checkbox"
          checked={data.reduce((prev, id) => {
            if (id === char.id) {
              return true;
            }
            const aliases = this.props.aliases[char.char_id] || [];
            if (aliases.indexOf(id) > -1) {
              return true;
            }
            return prev;
          }, false)}
          onChange={() => { this.handleCheck(); }}
        />
        <img
          src={`http://game-a.granbluefantasy.jp/assets/img_light/sp/assets/npc/m/${char.id}_01.jpg`}
          title={`${char.name} ${char.released}`}
          alt={char.name}
        />
      </label>
    );
  }
}
Character.propTypes = {
  aliases: PropTypes.shape().isRequired,
  query: PropTypes.shape(),
  char: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};
Character.defaultProps = {
  query: {},
};

export default connect(state => state)(Character);
