import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import axios from 'axios';
import upperCase from 'upper-case';

import { findCharacters, getTeam, getShareUrl } from './utils';

import Modal from './modal';
import Form from './form';
import Character from './checkbox-character';
import Team from './team';

import { Result, ResultItem } from './_styles';

const title = `${upperCase(NAME).replace(/-/g, ' ')} v${VERSION}`;
const gbfWikiDataURI = 'https://gitcdn.xyz/cdn/59naga/gbf.wiki-data/master/dist/chars.json';

class List extends React.Component {
  componentWillMount() {
    axios(gbfWikiDataURI).then(({ data: payload }) => {
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
        {
          found.length && (
            <Result>
              {
                found.map(char => (
                  <ResultItem key={char.id}>
                    <Character char={char} />
                  </ResultItem>
                ))
              }
            </Result>
          )
        }
        { team.length && <Team team={team} href={href} />}
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
