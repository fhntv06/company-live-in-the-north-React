export const isExternalLink = (url) => {
  const regex = /^(?!www\.|http(s)?:\/\/)[\w.]+$/;
  return regex.test(url);
};

export const swiperExternalLink = (href) => {
  if (isExternalLink(href)) {
    window.location.href = href;
  } else {
    window.open(href, '_blank');
  }
};
