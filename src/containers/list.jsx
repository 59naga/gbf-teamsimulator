// @flow
import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import axios from 'axios';

import { findCharacters, getTeam, getShareUrl } from '../misc/utils';

import Form from '../components/form';
import Character from '../components/checkbox-character';
import Team from '../components/team';

import { App, Head, Middle, Foot, Result, ResultItem } from './_styles';

const gbfWikiDataURI = 'https://gitcdn.xyz/cdn/59naga/gbf.wiki-data/master/dist/chars.json';

type Props = {
  query: { team: string },
  t: Function,
  loaded: boolean,
  dispatch: Function,
  characters: Array<Char>,
};

class Component extends React.Component<Props> {
  componentWillMount() {
    axios(gbfWikiDataURI).then(({ data: payload }) => {
      this.props.dispatch({ type: 'INIT', payload });
    });
  }
  render() {
    const { loaded, characters, query, t } = this.props;
    const found = findCharacters(characters, query);
    const team = getTeam(characters, query.team);
    const action = getShareUrl();

    let count = t('loading');
    if (loaded) {
      count = found.length ? t('found', { found: found.length }) : t('notfound');
    }

    const resultComponent = found.length ? (
      <Result>
        {found.map(char => (
          <ResultItem key={char.id}>
            <Character char={char} />
          </ResultItem>
          ))}
      </Result>
    ) : null;
    const teamComponent = team.length ? <Team team={team} /> : null;
    const titleComponent = null;

    return (
      <App>
        <Head>{teamComponent}</Head>
        <Middle>
          {resultComponent}
          {titleComponent}
        </Middle>
        <Foot>
          <Form action={action} count={count} />
        </Foot>
      </App>
    );
  }
}
export default connect(state => state)(translate()(Component));
