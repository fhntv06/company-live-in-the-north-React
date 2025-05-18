const getFileNameParts = (href) => {
  const split = href.split('/');
  const last = split[split.length - 1];
  return last.split('.');
};

export const getFileName = (href) => getFileNameParts(href)[0];
export const getFormat = (href) => getFileNameParts(href)[1];
