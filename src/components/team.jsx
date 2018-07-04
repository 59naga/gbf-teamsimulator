// @flow
import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import { translate } from 'react-i18next';

import { Member } from './_styles';

type Props = {
  t: Function,
  team: Array<Char>,
  href: string,
};

const Component: StatelessFunctionalComponent<Props> = ({ t, team }: Props) => {
  if (team.length === 0) {
    return null;
  }

  return (
    <div className="team">
      <section>
        {/* <header>
          <h1>{t('team.label')}</h1>
          <form action={href} target="_blank" rel="noreferrer noopener">
            <button>{t('team.share')}</button>
          </form>
        </header> */}
        {team.map(char => (
          <Member
            key={char.id}
            src={`http://game-a.granbluefantasy.jp/assets_en/img_light/sp/assets/npc/f/${char.id}_01.jpg`}
            title={`${char.name} ${char.released}`}
            alt={char.name}
          />
        ))}
      </section>
    </div>
  );
};

export default translate()(Component);
