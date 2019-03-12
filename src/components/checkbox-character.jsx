// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';

import _xor from 'lodash.xor';

import { CharacterCheckbox, Thumbnail } from './_styles';
import { elements as ELEMENTS } from '../misc/defines';

// char_idが同じキャラは同時に編成に入れられないため、クリック時に弾く

type Props = {
  query: { team: string },
  aliases: {},
  char: Char,
  dispatch: Function,
};

class Component extends React.Component<Props> {
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

    let any = '';
    const elements: string[] = query.element ? query.element.split(SEPARATOR) : [];
    if (char.element === 'Any' && elements.length) {
      const [element] = elements;
      any = `_0${ELEMENTS.indexOf(element) + 1}`;
    }

    return (
      <label htmlFor={componentName}>
        <CharacterCheckbox
          id={componentName}
          checked={checked}
          onChange={() => {
            this.handleCheck();
          }}
        />
        <Thumbnail
          checked={checked}
          src={`http://game-a.granbluefantasy.jp/assets/img_light/sp/assets/npc/m/${char.id}_01${any}.jpg`}
          title={`${char.name} ${char.released}`}
          alt={char.name}
        />
      </label>
    );
  }
}

export default connect(state => state)(Component);
