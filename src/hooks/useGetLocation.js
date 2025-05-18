import { useSelector } from 'react-redux';
import { getMunicipalities } from '../features/Municipality/municipalitySlice';

const useGetLocation = (municipalityId) => {
  if (!municipalityId) return null;

  const municipalities = useSelector(getMunicipalities);
  // eslint-disable-next-line max-len
  const municipality = municipalities && municipalities.filtred && municipalityId && municipalities.filtred.filter((i) => i.value === municipalityId);
  return municipality && municipality[0].label;
};

export default useGetLocation;
