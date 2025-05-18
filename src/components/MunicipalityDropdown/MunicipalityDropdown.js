/* eslint-disable max-len */
import React, {
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../Select/Select';
import { useGetAllMunicipalitiesQuery } from '../../services/municipalitiesApi';
import { setMunicipalities, setSelectedMunicipality, getSelectedMunicipality } from '../../features/Municipality/municipalitySlice';

const MunicipalityDropdown = ({ gradient, onChange }) => {
  const dispatch = useDispatch();
  const { data: municipalities } = useGetAllMunicipalitiesQuery();
  const selectedMunicipality = useSelector(getSelectedMunicipality);

  useEffect(() => {
    if (municipalities) {
      dispatch(setMunicipalities(municipalities));
    }
  }, [dispatch, municipalities]);

  const onChangeHandler = async (option) => {
    await dispatch(setSelectedMunicipality(option.value));
    onChange();
    window.location.reload();
  };

  const filteredMunicipalities = municipalities && municipalities?.filtred;

  const defaultValue = filteredMunicipalities?.find((item) => item.value === selectedMunicipality);

  return (
    municipalities && (
    <Select
      type={gradient ? 'button--color' : 'button--white'}
      options={filteredMunicipalities}
      className="select--button"
      classIsOpen="select--button--is-open"
      value={defaultValue}
      isSearchable={false}
      onChangeHandler={onChangeHandler}
    />
    )
  );
};

MunicipalityDropdown.propTypes = {
  gradient: PropTypes.bool,
  onChange: PropTypes.func,
};

MunicipalityDropdown.defaultProps = {
  gradient: false,
  onChange: () => {},
};

export default MunicipalityDropdown;
