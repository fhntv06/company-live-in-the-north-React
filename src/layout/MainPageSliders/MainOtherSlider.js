import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import GridSlider from '../../components/Slider/GridSlider';
import ProjectCardSmall from '../../components/ProjectsCard/ProjectCardSmall/ProjectCardSmall';

const MainOtherSlider = ({ projects }) => {
  const cards = useMemo(() => projects.slice(0, 7).map((event, index) => ({
    ...event,
    type: 'small',
    variant: index === 0 ? 'big' : 'small',
  })), [projects]);

  if (!cards.length) {
    return null;
  }

  return (
    <GridSlider
      withoutIndents
      title="Вы можете быть полезны прямо сейчас"
    >
      {cards.map((card) => (
        <ProjectCardSmall
          data={card}
        />
      ))}
    </GridSlider>
  );
};

MainOtherSlider.propTypes = {
  projects: PropTypes.shape().isRequired,
};

export default MainOtherSlider;
