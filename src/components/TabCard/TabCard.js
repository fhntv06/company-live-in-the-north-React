import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './TabCard.module.scss';
import VisibleWrapper from '../VisibleWrapper/VisibleWrapper';

const TabCard = ({ tabs, onSwitchTab, className }) => {
  const activeTab = tabs.find((tab) => tab.isActive);

  return (
    <div className={classnames(
      styles.wrapper,
      className,
    )}
    >
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {tabs.map(({ tabTitle, tabId, isActive }) => (
            <button
              type="button"
              className={classnames(
                styles.tab,
                { [styles.isActive]: isActive },
              )}
              onClick={() => { onSwitchTab(tabId); }}
            >
              {tabTitle}
            </button>
          ))}
        </div>
      </div>
      <div className={classnames(
        styles.tabContentWrapper,
      )}
      >
        <VisibleWrapper className={styles.tabContent}>
          {activeTab.tabContent}
        </VisibleWrapper>
      </div>
    </div>
  );
};

TabCard.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.shape({
    tabId: PropTypes.number,
    tabTitle: PropTypes.string,
    tabContent: PropTypes.node,
    isActive: PropTypes.bool,
  }))).isRequired,
  onSwitchTab: PropTypes.func,
  className: PropTypes.string,
};

TabCard.defaultProps = {
  onSwitchTab: null,
  className: '',
};

export default TabCard;
