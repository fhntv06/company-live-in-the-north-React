const removeTags = (str) => {
  let htmlStr = str;
  if (htmlStr === null || htmlStr === '') {
    return false;
  }
  htmlStr = str.toString();

  return htmlStr.replace(/<[^>]*>/g, '');
};

export default removeTags;
