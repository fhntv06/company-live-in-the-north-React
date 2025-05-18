import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Button from '../Button/Button';
import Wallet from '../Wallet/Wallet';
import styles from './ProductCard.module.scss';
import Icon from '../Icon/Icon';
import { getIsAuth, getMunicipalityId } from '../../features/Auth/authSlice';
import {
  useAddInCartMutation, useIncreaseProductInCartMutation,
} from '../../services/storeApi';
import { getSelectedMunicipality } from '../../features/Municipality/municipalitySlice';
import { useToggleProductFavoriteMutation } from '../../services/profileApi';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import useMediaQuery from '../../hooks/useMediaQuery';

const ProductCard = ({
  product,
  className,
}) => {
  const isAuth = useSelector((state) => getIsAuth(state.auth));
  const isMobile = useMediaQuery('(max-width: 767px)');
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
  const addInFavorite = async (e) => {
    e.preventDefault();
    toggleFavoriteHandler();
  };

  const addInCartHandler = async (event) => {
    event.preventDefault();
    try {
      if (inCart) {
        await increase(product.id).unwrap();
      } else {
        // eslint-disable-next-line no-undef
        await addInCart({ id: product.id, invalidate: false }).unwrap();
        setInCart(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setInCart(product.inCart);
  }, [product]);

  return (
    <Link
      to={`/product/${product.id}`}
      className={classnames(
        styles.card,
        {
          [styles.coupone]: product.category.value === 2,
          [styles.otherCategory]: product.category.value === 3,
          [styles.withoutImage]: !product.mainImagePreview,
        },
        className,
      )}
    >
      <div className={styles.top}>
        <div className={styles.topRow}>
          <span className={styles.category}>{product.category.description}</span>
          {isAuth
           && (
           <Button
             typeButton={`${favoriteView ? 'booksmark-btn-filled' : 'booksmark-btn'}`}
             className={styles.booksmarkBtn}
             onClick={addInFavorite}
           />
           )}
        </div>
        {product.mainImagePreview && (
          <div className={styles.imgWrapper} style={{ backgroundImage: `url(${product.mainImagePreview.url})` }} />
        )}
        {product.partnerId !== 1
        && !product.mainImagePreview
        && product?.partner?.image?.url && (
        <div className={styles.partnerImage}>
          <img src={product.partner.image.url} alt={product.partner.name} />
        </div>
        )}
      </div>
      <div className={styles.bottom}>
        <p className={styles.name}>
          {product.name}
        </p>
        <div className={styles.bottomRow}>
          <div className={styles.count}>
            {!isMobile ? (
              <>
                <span>
                  осталось:
                  {' '}
                </span>
                <strong>
                  {product.amount}
                </strong>
              </>
            ) : (
              <span>
                {product.amount}
                {' '}
                шт
              </span>
            )}

          </div>
          <div className={styles.bottomButtons}>
            <Wallet balance={product.price} className={styles.wallet} needPlus={false} />
            {isAuth && (selectedMunicipalityId === userMunicipalityId) && (
              <Button
                className={classnames(
                  styles.basket,
                  { [styles.productInCart]: inCart },
                )}
                onClick={addInCartHandler}
                disabled={inCart}
              >
                <Icon name={inCart ? 'basket-checked' : 'basket'} className={styles.basketIcon} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.number,
    productId: PropTypes.number,
    partnerId: PropTypes.number,
    type: PropTypes.number,
    inCart: PropTypes.bool,
    mainImagePreview: PropTypes.shape({
      url: PropTypes.string,
    }),
    mainImage: PropTypes.shape({
      media: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    isFavorite: PropTypes.bool,
    amount: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    partner: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
};
ProductCard.defaultProps = {
  className: '',
};

export default ProductCard;
