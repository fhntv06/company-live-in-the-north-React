const categoryName = (color, styles) => {
  let categoryColor;
  let backgroundClass;
  switch (color) {
    case 'violet':
    case '#9164F0':
      categoryColor = 'violet';
      backgroundClass = styles.violet;
      break;
    case 'bluemarin':
    case '#26AFCD':
      categoryColor = 'bluemarin';
      backgroundClass = styles.bluemarin;
      break;
    case 'blue':
    case '#5171F2':
      categoryColor = 'blue';
      backgroundClass = styles.blue;
      break;
    case 'pink':
    case '#CC8CCF':
      categoryColor = 'pink';
      backgroundClass = styles.pink;
      break;
    case 'orange':
    case '#FFB27B':
      categoryColor = 'orange';
      backgroundClass = styles.orange;
      break;
  }

  return { categoryColor, backgroundClass };
};

export default categoryName;
