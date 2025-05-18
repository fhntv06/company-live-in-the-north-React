import React, { useState } from 'react';
import {
  arrayOf,
  string,
} from 'prop-types';

import Comment from './Comment/Comment';
import InputField from '../Inputs/InputField/InputField';
import CyrillicInput from '../Inputs/CyrillicInput/CyrillicInput';
import Avatar from '../Avatar/Avatar';
import Wallet from '../Wallet/Wallet';

import styles from './AllComments.module.scss';

const AllComments = ({ comments }) => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h3 className={styles.title}>Отзывы</h3>
        <div className={styles.description}>
          <p>Поделитесь своими впечатлениями или оценивайте отзывы других</p>
          <Wallet type="avatar" balance={150} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.newComment}>
          <Avatar name="Name User" surname="Surname User" />
          <div className={`${styles.field} input-field`}>
            <InputField
              label="Ваш комментарий"
              value={value}
            >
              <CyrillicInput
                name="name"
                value={value}
                onChange={({ target }) => setValue(target.value)}
              />
            </InputField>
          </div>
        </div>
        {comments.map(({ person, textComment, end }) => (
          <Comment
            person={person}
            text={textComment}
            end={end}
          />
        ))}
      </div>
    </div>
  );
};

AllComments.propTypes = {
  comments: arrayOf({
    person: {
      name: string,
      surname: string,
      href: string,
    },
    textComment: string,
  }),
};

AllComments.defaultProps = {
  comments: [],
};

export default AllComments;
