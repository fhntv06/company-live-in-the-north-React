import plural from 'plural-ru';

const getOrderOptions = (ordersObj) => {
  const defaultValue = {
    title: 'У вас пока нет заказов :(',
    additionalText: null,
    showIcon: false,
    withoutLink: false,
  };

  if ((ordersObj?.all.length < 1) || !ordersObj) {
    return {
      ...defaultValue,
      withoutLink: true,
    };
  } // нет заказов и никогда не было

  if (ordersObj?.ready.length < 1 && ordersObj?.inProgress.length < 1
     && (ordersObj?.received.length > 0 || ordersObj?.canceled > 1)) {
    return {
      ...defaultValue,
      title: 'История заказов',
    };
  } // нет активных заказов, но когда-то были

  if (ordersObj?.ready.length === 0 && ordersObj?.inProgress.length > 0) {
    const titleText = plural(ordersObj.inProgress.length, '%d заказ в работе', '%d заказа в работе', '%d заказов в работе');

    return {
      ...defaultValue,
      title: titleText,
    };
  } // нет заказов к выдаче, но есть активный

  if (ordersObj?.ready.length > 0 && ordersObj?.inProgress.length < 1) {
    const titleText = plural(ordersObj.ready.length, '%d заказ к выдаче', '%d заказа к выдаче', '%d заказов к выдаче');

    return {
      ...defaultValue,
      title: titleText,
      showIcon: true,
    };
  } // один или несколько заказов готово к выдаче, других в работе нет

  if (ordersObj?.ready.length > 0 && ordersObj?.inProgress.length > 0) {
    const titleText = plural(ordersObj.ready.length, '%d заказ к выдаче', '%d заказа к выдаче', '%d заказов к выдаче');

    return {
      title: titleText,
      additionalText: `${ordersObj.inProgress.length} в обработке`,
      showIcon: true,
    };
  } // 1 или несколько заказов готово к выдаче, есть другие в обработке

  return defaultValue;
};

export default getOrderOptions;
