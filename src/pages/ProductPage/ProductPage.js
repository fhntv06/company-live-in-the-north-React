import React from 'react';
import { useParams } from 'react-router-dom';
import GalleryStore from '../../components/GalleryStore/GalleryStore';
import BackLink from '../../components/BackLink/BackLink';
import ProductCardMainInfo from '../../components/Store/ProductCardMainInfo/ProductCardMainInfo';
import ProductCardDescription from '../../components/Store/ProductCardDescription/ProductCardDescription';
import SliderShop from '../../components/SliderShop/SliderShop';
import removeTags from '../../helpers/removeTags';
import styles from './ProductPage.module.scss';
import CopyrightPartner from '../../components/CopyrightPartner/CopyrightPartner';
import {
  useGetProductByIdQuery, useGetSimilarProductsQuery,
} from '../../services/storeApi';
import MainPreloader from '../../components/MainPreloader/MainPreloader';
import Seo from '../../components/Seo/Seo';

const ProductPage = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const {
    data: similarProducts,
    isLoading: isSimilarProductsLoading,
  } = useGetSimilarProductsQuery(id);

  if (isLoading || isSimilarProductsLoading) {
    return <MainPreloader />;
  }

  const galleryImages = product.mainImage
    ? [product.mainImage].concat(product.images) : product.images;

  return (
    <>
      <Seo title={product.name} description={removeTags(product.description) ?? 'Обменивайте YAMALCOIN на товары'} />
      <div className={styles.wrapper}>
        <BackLink className={styles.backLink} />
        {product.images.length > 0 || product.mainImage ? (
          <GalleryStore
            data={galleryImages}
            className={styles.column}
          />
        ) : (
          <ProductCardMainInfo
            product={product}
            className={styles.productMainInfo}
          />
        )}
        <div className={styles.column}>
          {(product.mainImage || (product.images && product.images.length > 0)) && (
          <ProductCardMainInfo
            product={product}
            className={styles.productMainInfo}
          />
          )}
          {(product.description || product.productAttributes.length > 0) && (
          <>
            <ProductCardDescription
              description={product.description}
              attributes={product.productAttributes}
            />
          </>
          )}
          {product.partner && product.partnerId !== 1 ? (
            <CopyrightPartner
              className={styles.copyright}
              partner={product.partner}
            />
          ) : null}
        </div>
        {similarProducts && similarProducts.length > 0 && (
        <SliderShop
          className={styles.sliderProducts}
          products={similarProducts}
          title="Смотрите также"
        />
        )}
      </div>
    </>
  );
};

export default ProductPage;
