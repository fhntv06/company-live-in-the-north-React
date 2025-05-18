import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './EditProfile.module.scss';
import Button from '../../components/Button/Button';
import useModal from '../../hooks/useModal';
import InfoModal from '../../components/InfoModal/InfoModal';
import { useDeleteUserMutation } from '../../services/authApi';
import { logoutAction } from '../../features/Auth/authSlice';

const EditDeleteUserGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isOpen, openModalHandler,
    closeModalHandler,
  } = useModal();

  const [deletedUser] = useDeleteUserMutation();

  const onDeleteUserSubmit = async () => {
    try {
      const result = await deletedUser().unwrap();
      if (result.success) {
        dispatch(logoutAction());
        closeModalHandler();
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <p className={styles.inputGroupTitle}>Вы уверенны, что хотите удалить аккаунт?</p>
      </div>
      <div className={styles.submitButton}>
        <Button typeButton="button-fill" onClick={openModalHandler}>
          Удалить аккаунт
        </Button>
      </div>
      <InfoModal
        isOpen={isOpen}
        onClose={closeModalHandler}
        onSubmit={onDeleteUserSubmit}
        title="Вы точно уверены?"
        description="Вы можете восстановить свой профиль в течение 30 календарных дней через форму восстановления пароля. По прошествии этого времени восстановление будет невозможно."
      />
    </>
  );
};

export default EditDeleteUserGroup;
