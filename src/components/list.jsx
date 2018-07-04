// @flow
import React from 'react';
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

type Props = {
  query: { team: string },
  t: Function,
  loaded: boolean,
  dispatch: Function,
  characters: Array<Char>,
};

class List extends React.Component<Props> {
  componentWillMount() {
    axios(gbfWikiDataURI).then(({ data: payload }) => {
      this.props.dispatch({ type: 'INIT', payload });
    });
  }
  modal: ?{ getWrappedInstance: Function };
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
            <button
              onClick={() => {
                if (this.modal == null) return;
                this.modal
                  .getWrappedInstance()
                  .getWrappedInstance()
                  .handleOpenModal();
              }}
            >
              {title}
            </button>
          </h1>
        </header>
        <Modal
          ref={(modal: any) => {
            this.modal = modal;
          }}
          title={title}
        />
        <Form label={label} />
        {found.length ? (
          <Result>
            {found.map(char => (
              <ResultItem key={char.id}>
                <Character char={char} />
              </ResultItem>
            ))}
          </Result>
        ) : null}
        {team.length ? <Team team={team} href={href} /> : null}
      </div>
    );
  }
}
export default connect(state => state)(translate()(List));
