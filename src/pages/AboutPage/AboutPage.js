import React, { useMemo, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import htmlParser from 'html-react-parser';
import styles from './AboutPage.module.scss';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import DocumentLink from '../../components/Documents/DocumentLink';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import TabCard from '../../components/TabCard/TabCard';
import MapContainer from '../../components/MapContainer/MapContainer';
import LogoTab from './Tabs/AdsItemsTabs/LogoTab';
import ServicesDiscussionTab from './Tabs/ServicesTabs/ServicesDiscussionTab';
import ServicesAfishaTab from './Tabs/ServicesTabs/ServicesAfishaTab';
import ServicesVotingTab from './Tabs/ServicesTabs/ServicesVotingTab';
import ServicesCozyYamalTab from './Tabs/ServicesTabs/ServicesCozyYamalTab';
import ServicesResultTab from './Tabs/ServicesTabs/ServicesResultTab';
import BannerTab from './Tabs/AdsItemsTabs/BannerTab';
import GuidelineTab from './Tabs/AdsItemsTabs/GuidelineTab';
import Seo from '../../components/Seo/Seo';
import { openFeedback } from '../../features/Feedback/feedbackSlice';
import { getMunicipalities, getSelectedMunicipality } from '../../features/Municipality/municipalitySlice';
import { getRawNumber } from '../../helpers/getRawNumber';

const documents = [
  {
    href: `${process.env.PUBLIC_URL}/Договор оферты.pdf`,
  },
  {
    href: `${process.env.PUBLIC_URL}/Бонусная программа.pdf`,
  },
  {
    href: `${process.env.PUBLIC_URL}/Свидетельство на товарный знак №871300.pdf`,
  },
  {
    href: `${process.env.PUBLIC_URL}/Свидетельство на товарный знак №871301.pdf`,
  },
];

const initialServicesTabs = [
  {
    tabId: 1,
    tabTitle: 'Обсуждения',
    tabContent: <ServicesDiscussionTab />,
    isActive: true,
  },
  {
    tabId: 2,
    tabTitle: 'Голосования',
    tabContent: <ServicesVotingTab />,
    isActive: false,
  },
  {
    tabId: 3,
    tabTitle: 'Результаты',
    tabContent: <ServicesResultTab />,
    isActive: false,
  },
  {
    tabId: 4,
    tabTitle: 'Уютный ямал',
    tabContent: <ServicesCozyYamalTab />,
    isActive: false,
  },
  {
    tabId: 5,
    tabTitle: 'Афиша',
    tabContent: <ServicesAfishaTab />,
    isActive: false,
  },
];

const initialAdsItemsTabs = [
  {
    tabId: 1,
    tabTitle: 'Логотип',
    tabContent: <LogoTab />,
    isActive: true,
  },
  {
    tabId: 2,
    tabTitle: 'Баннеры',
    tabContent: <BannerTab />,
    isActive: false,
  },
  {
    tabId: 3,
    tabTitle: 'Гайдлайны',
    tabContent: <GuidelineTab />,
    isActive: false,
  },
];

const servicesTabsReducer = (state, action) => {
  if (action.type === 'SWITCH') {
    return state.map((tab) => ({
      ...tab,
      isActive: tab.tabId === action.value,
    }));
  }

  return state;
};

const AboutPage = () => {
  const dispatch = useDispatch();
  const [servicesTabs, dispatchServicesTabs] = useReducer(servicesTabsReducer, initialServicesTabs);
  const [adsItemsTabs, dispatchAdsItemTabs] = useReducer(servicesTabsReducer, initialAdsItemsTabs);

  const { data: municipalities } = useSelector(getMunicipalities);
  const selectedMunicipality = useSelector(getSelectedMunicipality);

  const contactsData = useMemo(
    () => {
      const data = municipalities.find((item) => item.id === selectedMunicipality)
        .municipalityAddresses.find(
          (item) => item.type.value === 1,
        );

      return {
        address: data?.address,
        phone: data.municipalityPhones[0]?.phone,
        workingHours: data?.workingHours,
        coords: data?.coords,
      };
    },
    [municipalities, selectedMunicipality],
  );

  const navigate = useNavigate();

  const switchServicesTabHandler = (tabId) => {
    dispatchServicesTabs({ type: 'SWITCH', value: tabId });
  };

  const switchAdsItemsTabHandler = (tabId) => {
    dispatchAdsItemTabs({ type: 'SWITCH', value: tabId });
  };

  const openModal = () => {
    dispatch(openFeedback());
  };

  return (
    <>
      <Seo title={'О портале | Живём на севере'} description={'Портал для тех, кому не безразлично, что происходит в округе, его городе, поселке, дворе.'} />
      <VisibleWrapper overflow="hidden">
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo} />
            </div>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                ЖИВЁМ НА СЕВЕРЕ
              </h1>
              <p className={styles.label}>
                Сообщество активных жителей
                {' '}
                <br />
                {' '}
                Ямала
              </p>
            </div>
          </div>
        </header>
      </VisibleWrapper>
      <main className={styles.main}>
        <div className={styles.aboutSection}>
          <div className={styles.firstColumn}>
            <h2 className={styles.aboutSectionTitle}>
              Портал для&nbsp;тех, кому
              небезразлично, что&nbsp;происходит
              в&nbsp;округе, его&nbsp;городе, поселке, дворе
            </h2>
            <div className={styles.documents}>
              {documents.map((document) => <DocumentLink openInNewTab href={document.href} />)}
            </div>
          </div>
          <div className={styles.secondColumn}>
            <p className={styles.aboutSectionText}>
              Пользуйтесь сервисами портала, приглашайте друзей и
              делитесь информацией в социальных сетях.
              За каждое голосование, идею, лайк и отзыв вам начисляются баллы,
              которые можно обменять на полезные сувениры или услуги из магазина.
            </p>
            <div className={styles.learnMoreBtnWrapper}>
              <Button
                className={styles.btn}
                typeButton="button-white"
                onClick={() => {
                  navigate('/bonus-program');
                }}
              >
                <Icon name="yamal-coin-circle" className={styles.yamalCoinIcon} />
                Подробнее о программе
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.services}>
          <h2 className={styles.servicesTitle}>
            Наши сервисы
          </h2>
          <TabCard
            className={styles.blockWithTabs}
            tabs={servicesTabs}
            onSwitchTab={switchServicesTabHandler}
          />
        </div>
        <div className={styles.contacts}>
          <h2 className={styles.contactsTitle}>
            КАК С НАМИ СВЯЗАТЬСЯ
          </h2>
          <div className={styles.contactsInfo}>
            {contactsData.address && (
            <p className={styles.contactsFirstColumn}>
              {htmlParser(contactsData.address)}
            </p>
            )}
            <div className={styles.contactsSecondColumn}>
              {contactsData.phone && (
              <div className={styles.phone}>
                <a href={`tel:+${getRawNumber(contactsData.phone)}`}>
                  {contactsData.phone}
                </a>
              </div>
              )}
              {contactsData.workingHours && (
              <div className={styles.workingDays}>
                {htmlParser(contactsData.workingHours)}
              </div>
              )}
            </div>
            <div className={styles.contactsThirdColumn}>
              <Button
                className={styles.btn}
                typeButton="button-white"
                onClick={openModal}
              >
                Обратная связь
              </Button>
            </div>
          </div>
          {contactsData.coords && (
          <div className={styles.map}>
            <MapContainer
              mapCoord={contactsData.coords}
              placemarkCoords={[contactsData.coords]}
            />
          </div>
          )}
        </div>
        <div className={styles.adsItems}>
          <h2 className={styles.adsItemsTitle}>
            РЕКЛАМНЫЕ МАТЕРИАЛЫ
          </h2>
          <TabCard
            className={styles.blockWithTabs}
            tabs={adsItemsTabs}
            onSwitchTab={switchAdsItemsTabHandler}
          />
        </div>
      </main>
    </>
  );
};

export default AboutPage;
