import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styles from './AfishaTabs.module.scss';
import TabButton from '../TabButton/TabButton';

const AfishaTabs = ({
  data, activeTab, selectTab, tabs,
}) => {
  const Content = tabs[activeTab].content;
  const { additionalProps } = tabs[activeTab];
  const containerRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          !tab.disabled && (
          <TabButton
            key={tab.id}
            onClick={() => selectTab(tab.id)}
            type="button"
            name={tab.name}
            smallName={tab.smallName ?? tab.name}
            isActive={activeTab === tab.id}
          />
          )
        ))}
      </div>
      <SwitchTransition>
        <CSSTransition
          key={activeTab}
          classNames="fadeIn"
          nodeRef={containerRef}
          timeout={200}
        >
          <div className={styles.content} ref={containerRef}>
            <Content data={data} {...additionalProps} />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

AfishaTabs.propTypes = {
  data: PropTypes.shape().isRequired,
  activeTab: PropTypes.number.isRequired,
  selectTab: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.elementType,
      name: PropTypes.string,
      id: PropTypes.number,
      cl: PropTypes.string,
      additionalProps: PropTypes.shape(),
    }),
  ).isRequired,
};

export default AfishaTabs;
