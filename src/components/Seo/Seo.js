import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Seo = ({
  title, description,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Helmet>
);

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Seo.defaultProps = {
  title: null,
  description: null,
};

export default Seo;
