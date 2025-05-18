import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const toggleModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen, openModalHandler, closeModalHandler, toggleModalHandler,
  };
};

export default useModal;
