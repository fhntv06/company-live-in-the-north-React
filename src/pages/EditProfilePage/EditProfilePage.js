import React, { useMemo, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import PageHeader from '../../components/PageHeader/PageHeader';
import TabButton from '../../components/TabButton/TabButton';
import styles from './EditProfile.module.scss';
import MainEditInputGroup from './MainEditInputGroup';
import EditDeleteUserGroup from './EditDeleteUserGroup';
import Seo from '../../components/Seo/Seo';

const tabs = [
  {
    id: 1,
    name: 'Редактировать данные',
  },
  {
    id: 2,
    name: 'Удалить аккаунт',
  },
];

const EditProfilePage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const content = useMemo(() => {
    switch (activeTab) {
      case 2:
        return <EditDeleteUserGroup />;
      default:
        return <MainEditInputGroup />;
    }
  }, [activeTab]);

  return (
    <>
      <Seo title={'Редактирование личных данных | Живём на севере'} description={'Редактирование личных данных пользователя'} />
      <PageHeader
        compact
        withoutControls
      >
        <h1 className={styles.title}>Личные данные</h1>
      </PageHeader>
      <div className={styles.page}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <TabButton
              name={tab.name}
              isActive={tab.id === activeTab}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
        <SwitchTransition>
          <CSSTransition
            key={activeTab}
            classNames="fadeIn"
            timeout={200}
          >
            <div className={styles.content}>
              {content}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default EditProfilePage;
