/* eslint-disable max-len */
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import PageHeader from '../../components/PageHeader/PageHeader';
import headerLogoImg from '../../images/united_russia.svg';
import styles from './XmasTreePage.module.scss';
import VisibleWrapper from '../../components/VisibleWrapper/VisibleWrapper';
import Faq from '../../components/Faq/Faq';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import { GradientLight } from '../../helpers/gradients';
import { useGetXmasFaqsQuery, useGetStepsQuery } from '../../services/xmasTreeApi';
import { getIsAuth } from '../../features/Auth/authSlice';
import XmasTreeFirstStep from './XmasTreeSteps/XmasTreeFirstStep';
import XmasTreeSecondStep from './XmasTreeSteps/XmasTreeSecondStep';
import XmasTreeThirdStep from './XmasTreeSteps/XmasTreeThirdStep';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import Seo from '../../components/Seo/Seo';

const XmasTreePage = () => {
  const [faqOpen, setFaqOpen] = useState(false);
  const [step, setStep] = useState();
  const isAuth = useSelector((state) => getIsAuth(state.auth));

  const {
    data: faqs,
  } = useGetXmasFaqsQuery();

  const { data: steps } = useGetStepsQuery();

  const renderStepIcon = (isActive) => (isActive ? (
    <Icon
      className={classnames(
        styles.stepIcon,
        {
          [styles.stepActiveIcon]: isActive,
        },
      )}
      name="flag"
      stroke="url(#paint0_linear_8593_42953)"
    >
      {GradientLight('paint0_linear_8593_42953', 26, 1, 0, 1)}
    </Icon>
  ) : (
    <Icon className={styles.stepIcon} name="arrow-all-events" stroke="url(#paint0_linear_8593_32301)">
      {GradientLight('paint0_linear_8593_32301', 26, 1, 0, 1)}
    </Icon>
  ));

  const dateUtcOffset = (date) => moment(date).utcOffset(date);

  useEffect(() => {
    if (steps && steps.length > 0) {
      steps.forEach((element) => {
        if (element.status.value === 2) {
          setStep(element);
        }
      });
    }
  }, [steps]);

  const content = useMemo(() => {
    let stepContent;
    if (step && step.type) {
      switch (step.type.key) {
        case 'STATUS_COLLECTING':
          stepContent = <XmasTreeFirstStep isAuth={isAuth} step={step} />;
          break;
        case 'STATUS_FIND_EXECUTORS':
          stepContent = <XmasTreeSecondStep isAuth={isAuth} step={step} />;
          break;
        case 'STATUS_EXECUTION':
          stepContent = <XmasTreeThirdStep step={step} />;
          break;
      }
    }
    // else if (steps && (steps[0].status.value === 3)) {
    //   stepContent = (
    //     <div className={styles.wrapperDisclamer}>
    //       <p>
    //         В соответствии с условиями Акции нами уже принято в работу 600 заявок, следующий этап – поиск дарителя начнётся
    //         {' '}
    //         {dateUtcOffset(steps[1].dateStart).format('DD.MM.YYYY')}
    //       </p>
    //     </div>
    //   );
    // }
    return stepContent;
  }, [step, steps]);

  return (
    <>
      <Seo title={'Ёлка заботы | Живём на севере'} description={'Делай добрые дела в преддверии праздника'} />
      <PageHeader
        withoutControls
        withoutBackLink
        className={styles.header}
      >
        <VisibleWrapper className={styles.visibleWrapper}>
          <div className={styles.headerLogoWrapper}>
            <img src={headerLogoImg} className={styles.headerLogo} alt="united russia" />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.mainTitle}>Ёлка заботы</h1>
            <p className={styles.headerText}>
              Делай добрые дела в преддверии
              <br />
              настоящего северного праздника
            </p>
          </div>
        </VisibleWrapper>
      </PageHeader>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.stepsWrapper}>
            <ul className={styles.steps}>
              {steps && steps.length > 0 && steps.map((item) => (
                <li className={classnames(
                  styles.step,
                  {
                    [styles.active]: item.status.value === 2,
                    [styles.done]: item.status.value === 3,
                  },
                )}
                >
                  <span className={styles.stepDate}>
                    <>
                      {item.status.value === 3 ? 'завершено' : (
                        <>
                          {dateUtcOffset(item.dateStart).format('DD')}
                          {' '}
                          {dateUtcOffset(item.dateStart).format('MMM').slice(0, 3)}
                          {' '}
                          -
                          {' '}
                          {dateUtcOffset(item.dateEnd).format('DD')}
                          {' '}
                          {dateUtcOffset(item.dateEnd).format('MMM').slice(0, 3)}
                        </>
                      )}
                    </>
                  </span>
                  <span className={styles.stepLabel}>{item.name}</span>
                  {renderStepIcon(item.status.value === 2)}
                </li>
              ))}
            </ul>
          </div>
          {!content ? (
            <div className={styles.spinner}>
              <SpinnerLoader isLoading={!content} />
            </div>
          ) : content}
        </div>
      </main>
      <aside className={styles.aside}>
        <Faq
          className={styles.faq}
          questions={faqs && faqs.slice(0, 5)}
          open={faqOpen}
          setOpen={setFaqOpen}
        >
          <h3 className={styles.faqTitle}>ВОПРОС-ОТВЕТ</h3>
          <SpinnerLoader isLoading={!faqs} />
          <div className={styles.more}>
            <Button className={styles.button} typeButton="button" to="/tree-of-care/faq">Все вопросы</Button>
          </div>
        </Faq>
      </aside>
    </>
  );
};

export default XmasTreePage;
