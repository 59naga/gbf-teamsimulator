import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import axios from 'axios';
import upperCase from 'upper-case';

import Modal from './modal';
import Form from './form';
import Character from './checkbox-character';

import { findCharacters, getTeam, getShareUrl } from './utils';

const title = `${upperCase(NAME).replace(/-/g, ' ')} v${VERSION}`;

class List extends React.Component {
  componentWillMount() {
    axios('https://gitcdn.xyz/cdn/59naga/gbf.wiki-data/master/dist/chars.json').then(({ data: payload }) => {
      this.props.dispatch({ type: 'INIT', payload });
    });
  }
  render() {
    const { loaded, characters, query, t } = this.props;
    const found = findCharacters(characters, query);
    const team = getTeam(characters, query.team);
    const href = getShareUrl();

    let label = t('loading');
    if (loaded) {
      label = found.length ? t('found', { found: found.length }) : t('notfound');
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
                  <h1>{t('team.label')}</h1>
                  <a href={href} target="_blank" rel="noreferrer noopener">{t('team.share')}</a>
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
  query: PropTypes.shape(),
  t: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  characters: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
List.defaultProps = {
  query: {},
};

export default connect(state => state)(translate()(List));
