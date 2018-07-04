// @flow
import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import { translate } from 'react-i18next';

type Props = {
  t: Function,
  team: Array<Char>,
  href: string,
};

const Team: StatelessFunctionalComponent<Props> = ({ t, team, href }: Props) => (
  <div className="team">
    <section>
      <header>
        <h1>{t('team.label')}</h1>
        <a href={href} target="_blank" rel="noreferrer noopener">
          {t('team.share')}
        </a>
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
);

export default translate()(Team);
