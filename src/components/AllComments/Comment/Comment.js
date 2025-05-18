import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import { shape, string, bool } from 'prop-types';
import Button from '../../Button/Button';
import Avatar from '../../Avatar/Avatar';
import styles from './Comment.module.scss';

const Comment = ({
  person: {
    name,
    surname,
    href,
  },
  text,
  end,
}) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('');

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current.offsetHeight < 128) setSize(styles.small);
  }, [open]);

  return (
    <div className={`${styles.comment} ${open ? styles.open : ''} ${size}`}>
      <Avatar
        name={name}
        surname={surname}
        href={href}
      />
      <div ref={contentRef} className={styles.content}>
        <div className={styles.content__inner}>
          <div className={styles.name}>{`${name} ${surname[0]}.`}</div>
          <div className={styles.text}>{text}</div>
        </div>
        {!end && (
          <div className={styles.answer}>
            <Button
              typeButton="button-white"
              className={styles.answer__button}
            >
              Ответить
            </Button>
          </div>
        )}
        <div className={styles.readNext}>
          <button type="button" onClick={() => setOpen(true)}>
            ЧИТАТЬ ДАЛЕЕ
          </button>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  person: shape({
    name: string,
    surname: string,
    href: string,
  }).isRequired,
  text: string.isRequired,
  end: bool,
};

Comment.defaultProps = {
  end: false,
};

export default Comment;
