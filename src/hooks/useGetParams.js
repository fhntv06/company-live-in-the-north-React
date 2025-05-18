import { useLocation } from 'react-router-dom';
import { formatStringToCamelCase } from '../helpers/format';

export default function useGetParams() {
  const location = useLocation();
  const args = location.search.replace('?', '').split('&');
  let params = {};

  args.forEach((item) => {
    const isArray = item.includes('[]');
    const arr = item.replaceAll('[]', '').split('=');
    const key = formatStringToCamelCase(arr[0]);
    if (params[key]) {
      params = {
        ...params,
        [key]: [...params[key], arr[1]],
      };
    } else {
      params = {
        ...params,
        [key]: isArray ? [arr[1]] : arr[1],
      };
    }
  });

  return params;
}
