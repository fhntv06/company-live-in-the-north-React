import React, { useState, useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import classnames from 'classnames';
import parser from 'html-react-parser';
import styles from './DiscussionContent.module.scss';
import GotAnIdea from '../../../components/GotAnIdea/GotAnIdea';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import IdeaForm from '../../../components/IdeaForm/IdeaForm';
import Gallery from '../../../components/Gallery/Gallery';
import AllIdea from '../../../components/AllIdea/AllIdea';
import DocumentLink from '../../../components/Documents/DocumentLink';
import useModal from '../../../hooks/useModal';
import useMediaQuery from '../../../hooks/useMediaQuery';
import DiscussionWarning from './DiscussionWarning';
import SpinnerLoader from '../../../components/SpinnerLoader/SpinnerLoader';

const onSubmit = () => alert('Отправлено!');

const DiscussionContent = ({
  item,
  ideas,
  isCozyYamal,
  isAuth,
  user,
  loadData,
}) => {
  const { isOpen, openModalHandler, closeModalHandler } = useModal();
  const [disabled, setDisabled] = useState(!isAuth);
  const {
    images, step, files,
  } = item;

  useEffect(() => {
    if (!isAuth) {
      setDisabled(!isAuth);
    }
  }, [isAuth]);

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <div className={classnames(
        styles.mainContainer,
        {
          [styles.isCozyYamal]: isCozyYamal,
          [styles.disabled]: item.step.value === 4 || item.step.value === 2,
          [styles.noDocuments]: !item.files?.length,
          [styles.noGallery]: images && images.length === 0,
          [styles.noIdeas]: ideas && ideas.length === 0,
        },
      )}
      >
        <div className={styles.textBlock}>
          <h3>
            {!isCozyYamal
              && parser(item?.description)}
            {isCozyYamal && item.step.value === 1
              && 'Вы можете предложить решение местных проблем. Непосредстевенно жители определяют направления расходования бюджетных средств, софинансируют выбранные объекты, контролируют результат'}
            {isCozyYamal && item.step.value === 2
              && 'Презентация проектов будет проходить по адресу с. Аксарка, ул. Первомайская, д. 24, вход открыт для всех желающих'}
          </h3>
        </div>
        {(images && images.length)
          ? (
            <div className={styles.gallery}>
              <Gallery
                items={images}
                className={styles.galleryItem}
                maxPreviewItems={4}
              />
            </div>
          ) : null}
        {(files && files.length)
          ? (
            <div className={styles.documents}>
              {files.map((file) => <DocumentLink href={file?.media.url} />)}
            </div>
          ) : null}
        <DiscussionWarning isAuth={isAuth} user={user} item={item} setDisabled={setDisabled} />
        <div className={styles.spinnerWrapper}>
          <SpinnerLoader isLoading={loadData} />
        </div>
        {ideas && (
          <AllIdea
            className={styles.allIdea}
            ideas={ideas}
            disabled={disabled}
          />
        )}
      </div>
      {step.value === 3 && (
        <>
          {!isMobile && (
          <div className={styles.mainSide}>
            <IdeaForm id={item.id} disabled={disabled} onSubmit={onSubmit} />
          </div>
          )}
          {
            isMobile && (
            <GotAnIdea
              disabled={disabled}
              onSubmit={onSubmit}
              isOpen={isOpen}
              onClose={closeModalHandler}
              id={item.id}
            />
            )
          }
          <div className={styles.shareIdeaBtnWrapper}>
            <Button onClick={openModalHandler} type="button" className={styles.shareIdeaBtn} typeButton="button-fill">
              <div className={styles.shareIdeadBtnInnerWrapper}>
                <Icon className={styles.ideaIcon} name="idea-lamp" />
                <span>
                  Есть
                  <br />
                  идея?
                </span>
              </div>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

DiscussionContent.propTypes = {
  item: PropTypes.objectOf(shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  ideas: PropTypes.objectOf(shape()).isRequired,
  isCozyYamal: PropTypes.bool,
  isAuth: PropTypes.bool,
  user: PropTypes.objectOf(shape({})),
  loadData: PropTypes.bool,
};

DiscussionContent.defaultProps = {
  isCozyYamal: false,
  isAuth: false,
  user: null,
  loadData: false,
};

export default DiscussionContent;
