const formGeneralSearchData = (dataObj) => {
  switch (dataObj.type) {
    case 'Discussion':
      return {
        href: `/discussions/${dataObj.id}`,
        page: 'Обсуждения',
      };

    case 'Voting':
      return {
        href: `/votings/${dataObj.id}`,
        page: 'Обсуждения',
      };

    case 'DiscussionResult':
      return {
        href: `/results/${dataObj.id}`,
        page: 'Результаты и статистика',
      };

    case 'Product':
      return {
        href: `/product/${dataObj.warehouse_product_id}`,
        page: 'Магазин',
        image: dataObj.image.url,
      };

    case 'AfishaPlace':
      return {
        href: `/afisha/place/${dataObj.id}`,
        page: 'Афиша',
      };

    case 'AfishaEvent':
      return {
        href: `/afisha/event/${dataObj.slug}`,
        page: 'Афиша',
        image: dataObj.image.url,
      };

    default:
      return {
        href: '#0',
        page: 'Прочее',
      };
  }
};

export default formGeneralSearchData;
