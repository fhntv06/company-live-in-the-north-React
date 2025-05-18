import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import Wallet from '../../Wallet/Wallet';
import Button from '../../Button/Button';
import BackgroundCards from '../../BackgroundCards/BackgroundCards';
import { GradientViolet } from '../../../helpers/gradients';
import styles from './ProductCardMainInfo.module.scss';
import {
  useAddInCartMutation, useIncreaseProductInCartMutation,
} from '../../../services/storeApi';
import { useToggleProductFavoriteMutation } from '../../../services/profileApi';
import useToggleFavorite from '../../../hooks/useToggleFavorite';
import { getIsAuth, getMunicipalityId } from '../../../features/Auth/authSlice';
import { getSelectedMunicipality } from '../../../features/Municipality/municipalitySlice';
import ShareModal from '../../ShareModal/ShareModal';
import useModal from '../../../hooks/useModal';

const ProductCardMainInfo = ({
  product,
  className,
}) => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const selectedMunicipalityId = useSelector(getSelectedMunicipality);
  const userMunicipalityId = useSelector(getMunicipalityId);
  const [inCart, setInCart] = useState(product.inCart);

  const [addInCart] = useAddInCartMutation();
  const [increase] = useIncreaseProductInCartMutation();

  const [togglePlaceFavorite] = useToggleProductFavoriteMutation();
  const {
    favoriteView,
    toggleFavoriteHandler,
  } = useToggleFavorite(
    product.id,
    'products',
    togglePlaceFavorite,
  );

  const {
    isOpen: isShareModalOpen,
    openModalHandler: openShareModalHandler,
    closeModalHandler: closeShareModalHandler,
  } = useModal();

  const addProductInCart = async () => {
    try {
      if (inCart) {
        await increase(product.id).unwrap();
      } else {
        await addInCart({ id: product.id, invalidate: true }).unwrap();
        setInCart(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classnames(
      styles.wrapper,
      className,
      { [styles.coupon]: product.category.value === 2 },
    )}
    >
      <BackgroundCards
        className={styles.background}
        position={product.category.value === 2 ? 'right' : 'left'}
      />
      <div className={styles.header}>
        <div className={styles.label}>{product.category.description}</div>
        <div className={styles.buttons}>
          <Button
            typeButton="share-color"
            onClick={openShareModalHandler}
          />
          {isAuth && (
            <Button
              typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
              onClick={toggleFavoriteHandler}
              iconProps={{ stroke: 'url(#booksmark)' }}
              gradient={GradientViolet('booksmark', 12.8696, 3.32598, 0.999995, 0.999995)}
            />
          )}
        </div>
      </div>
      <div className={styles.body}>
        {product.partnerId !== 1 && product.partner && (
        <img
          className={styles.logo}
          src={product.partner.image.url}
          alt={product.partner.name}
        />
        )}
        <h2 className={styles.title}>{product.name}</h2>
      </div>
      <div className={styles.footer}>
        <div className={styles.last}>
          <p className={styles.lastNumber}>
            ОСТАЛОСЬ:
            {' '}
            <span>{product.amount}</span>
          </p>
          <Wallet
            type="avatar"
            className={styles.wallet}
            balance={product.price}
            needPlus={false}
          />
        </div>
        {isAuth && (selectedMunicipalityId === userMunicipalityId
        && userMunicipalityId === product.municipalityId)
        && (
        <Button
          typeButton="button-fill--small"
          className={classnames(
            styles.button,
            {
              [styles.activeButton]: inCart,
            },
          )}
          onClick={addProductInCart}
        >
          {inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
        </Button>
        )}
      </div>
      <ShareModal title="Поделиться" isOpen={isShareModalOpen} onClose={closeShareModalHandler} />
    </div>
  );
};

ProductCardMainInfo.propTypes = {
  product: PropTypes.shape({
    inCart: PropTypes.bool,
    category: PropTypes.shape({
      value: PropTypes.number,
      description: PropTypes.string,
    }),
    name: PropTypes.string,
    type: PropTypes.number,
    id: PropTypes.number,
    price: PropTypes.number,
    amount: PropTypes.number,
    isFavorite: PropTypes.bool,
    partner: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    partnerId: PropTypes.number,
    municipalityId: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};

ProductCardMainInfo.defaultProps = {
  className: '',
};

export default ProductCardMainInfo;
