import React, {
  useEffect, useMemo,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import Button from '../../components/Button/Button';
import ResultCard from '../../components/ResultCard/ResultCard';
import CozyYamalSlider from './CozyYamalSlider/CozyYamalSlider';
import styles from './CozyYamal.module.scss';
import {
  fetchResults,
  selectResultsRecently,
} from '../../features/DiscussionsResults/resultsSlice';
import { fetchProjects, selectAllProjects } from '../../features/Projects/projectsSlice';
import Icon from '../../components/Icon/Icon';
import { useGetCozyYamalQuery } from '../../services/cozyYamalSlice';
import MainPreloader from '../../components/MainPreloader/MainPreloader';

const CozyYamal = () => {
  const dispatch = useDispatch();
  const resultRecently = useSelector((state) => selectResultsRecently(state));
  const project = useSelector((state) => selectAllProjects(state));

  const { data, isLoading, isSuccess } = useGetCozyYamalQuery();

  const buttons = useMemo(() => {
    switch (data?.currentStep) {
      case 5:
      case 4:
        return (
          <div className={styles.buttons}>
            <Button
              to={`${process.env.PUBLIC_URL}/winners.pdf`}
              isExternal
              className={styles.button}
              typeButton="button-fill"
            >
              Итоги викторины
            </Button>
            <Button
              to={`votings/${data?.votings[0].id}`}
              className={styles.button}
              typeButton="button-fill"
            >
              Итоги
            </Button>
          </div>
        );
      case 3:
        return (
          <Button
            to={!data?.votings[0].voted ? `votings/${data?.votings[0].id}` : '/quiz'}
            className={styles.button}
            typeButton="button-fill"
          >
            {data?.votings[0].voted ? 'Пройти викторину' : 'Участвовать'}
          </Button>
        );
      case 2:
      default:
        return (
          <Button
            to={`discussions/${data?.discussions[0].id}`}
            className={styles.button}
            typeButton="button-fill"
          >
            участвовать
          </Button>
        );
    }
  }, [data]);

  useEffect(() => {
    if (!resultRecently) dispatch(fetchResults());
    if (!project) dispatch(fetchProjects());
  }, []);

  if (!resultRecently || !project) return false;

  if ((isLoading && !isSuccess) || !data) {
    return <MainPreloader />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.mainHeader}>
        <div className={styles.headerContent}>
          <h1 className={`${styles.title} ${styles.textUpper}`}>уютный ямал</h1>
          <p className={styles.textMedium}>Проект поддержки местных инициатив</p>
        </div>
        {buttons}
        <Icon name="region-yamal" className={styles.region} />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTopContent}>
          <div className={styles.contentLeft}>
            <h3 className={styles.textBig}>
              Предлагайте проекты, которые решат насущные проблемы,
              распределяйте часть городских и районных бюджетов, контролируйте исполнение
            </h3>
          </div>
          <div className={styles.contentRight}>
            <p className={styles.textSmall}>
              Непосредственно сами жители округа предлагают и
              определяют направления расходования бюджетных средств,
              софинансируют выбранные объекты, контролируют результат.
            </p>
            <p className={styles.textSmall}>
              При этом привлечение средств как дополнительного
              источника финансирования не является целью.
              Участие граждан способствует отбору приоритетных
              проектов, бережной эксплуатации объекта, изменению
              отношения людей к своей роли в развитии города или района.
            </p>
          </div>
        </div>
        <div className={styles.sloganContainer}>
          <Icon name="region" className={styles.sloganIcon} />
          <div className={styles.sloganText}>
            <p>
              Уютный ямал — это решение местных проблем
              {' '}
              <br />
              {' '}
              по инициативе и при участии граждан
            </p>
          </div>
        </div>
        {isSuccess && (
          <div className={styles.mainContent}>
            <CozyYamalSlider steps={data.steps} />
          </div>
        )}
        <div className={styles.mainDescriptionWrapper}>
          <div className={styles.mainDescription}>
            <h2 className={`${styles.textBig} ${styles.textUpper}`}>как получить поддержку своей идеи?</h2>
            <div className={styles.mainDescriptionText}>
              <p className={styles.textMedium}>
                С 1 мая по 11 июня можно разместить заявку на сайте живемнасевере.рф
                и ждать, что идея понравится другим пользователям
              </p>
              <p className={styles.textSmall}>
                Более конструктивный вариант — организовать инициативную группу и
                провести собрание жителей, где будет представлена ваша идея.
                Заручившись поддержкой, выходить на голосование Голосование будет
                проходить на сайте живемнасевере.рф
              </p>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            {buttons}
          </div>
        </div>
      </div>
      <div className={styles.mainFooter}>
        <div className={styles.mask} />
        <div className={styles.mainFooterContent}>
          <h2 className={`${styles.textBig} ${styles.textUpper}`}>что такое уютный ямал?</h2>
          <div className={styles.mainFooterText}>
            <p className={styles.textMedium}>
              В каждом городе и районе округа работает проектный офис «Уютного Ямала»
            </p>
            <p className={styles.textSmall}>
              Специалисты проконсультируют по оформлению проекта и
              заполнению заявки, помогут организовать собрание жителей и
              окажут информационную поддержку инициативе.
              По результатам голосования специалисты проектного офиса
              настроят мониторинг реализации победивших проектов.
            </p>
            {data.discussionsResults.length > 0 && (
            <p className={`${styles.textMedium} ${styles.example}`}>
              Например,
            </p>
            )}

          </div>
        </div>
        {data.discussionsResults.length > 0
                && (
                <div className={styles.mainFooterCard}>
                  <p className={`${styles.textMedium} ${styles.example}`}>
                    Например,
                  </p>

                  <div className={styles.cardWrapper}>
                    <ResultCard data={data.discussionsResults[0]} />
                  </div>

                </div>
                )}

        <div className={styles.mask} />
      </div>
    </main>
  );
};

export default CozyYamal;
