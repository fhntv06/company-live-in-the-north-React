import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import classnames from 'classnames';
import styles from './Faq.module.scss';
import FaqCard from '../FaqCard/FaqCard';
import VisibleWrapper from '../VisibleWrapper/VisibleWrapper';

const Faq = ({
  questions, children, className,
}) => {
  const content = (
    <div className={styles.content}>
      {children}
      {questions && questions.length > 0 && questions.map((item, index) => (
        <FaqCard title={item.question} index={index}>
          {parse(item.answer)}
        </FaqCard>
      ))}
    </div>
  );

  const Wrapper = () => (
    className ? (
      <div className={classnames(styles.wrapper, className)}>
        {content}
      </div>
    )
      : (
        <VisibleWrapper overflow roundCorners className={classnames(styles.wrapper, className)}>
          {content}
        </VisibleWrapper>
      ));
  return (
    <Wrapper />
  );
};

Faq.propTypes = {
  className: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string,
  })).isRequired,
  children: PropTypes.node,
};

Faq.defaultProps = {
  className: '',
  children: null,
};

export default Faq;
