export const formatPhone = (phone) => {
  const pattern = /(\+7|8|7)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
  return phone.replace(pattern, '+7 ($2) $3 $4 $5');
};

export const formatPhoneForMask = (phone) => {
  const pattern = /(\+7|8|7)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
  return phone.replace(pattern, '+7 $2 $3 $4$5');
};

export const formatStringToCamelCase = (key) => key.split('_').map((keyItem, index) => {
  if (index === 0) {
    return keyItem;
  }

  return keyItem[0].toUpperCase() + keyItem.substring(1);
}).join('');

export const normalizeToCamelKeys = (item, deep = true) => {
  if (typeof item !== 'object' || item === null) {
    return item;
  }

  if (Array.isArray(item)) {
    return item.map((subItem) => normalizeToCamelKeys(subItem, deep));
  }

  const keys = Object.keys(item);
  let res = {};

  keys.forEach((key) => {
    let value = item[key];

    if (deep) {
      value = normalizeToCamelKeys(value, deep);
    }

    const normalizeKey = formatStringToCamelCase(key);

    res = {
      ...res,
      [normalizeKey]: value,
    };
  });

  return res;
};

export const formatParams = (url, options, filters = '') => {
  const keys = Object.keys(options);

  const string = keys.reduce((current, key) => {
    const value = options[key];
    if ((Array.isArray(value) && !value.length) || !value) {
      return current;
    }
    const separator = '&';
    const params = !Array.isArray(value)
      ? `${key}=${value}`
      : value.reduce((c, v, i) => `${c}${i === 0 ? '' : separator}${key}[]=${v}`, '');

    return `${current}${separator}${params}`;
  }, '');

  if (string.length > 0) {
    return `${url}${string.replace('&', '?')}${filters.replace('?', '&')}`;
  }

  return `${url}${filters}`;
};

export const normalizeToSnakeKeys = (item) => item.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
export const normalizeCost = (num) => num.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

export const formatDateString = (string) => {
  const arr = string.split('.');
  return `${arr[1]}.${arr[0]}.${arr[2]}`;
};
