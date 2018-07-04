import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const Team = ({ t, team, href }) => (
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
);
Team.propTypes = {
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape).isRequired,
  href: PropTypes.string.isRequired,
};

export default translate()(Team);
