import React, { useMemo } from 'react';
import PropTypes, { shape } from 'prop-types';
import styles from './FileItem.module.scss';
import Icon from '../Icon/Icon';

const FileItem = ({ file, onRemove }) => {
  const fileData = useMemo(() => ({
    fileName: file?.name.lastIndexOf('.') !== -1 ? file?.name.slice(0, file.name.lastIndexOf('.')) : file?.name,
    fileExtension: file?.name.lastIndexOf('.') !== -1 ? file?.name.slice(file.name.lastIndexOf('.') + 1) : 'file',
  }), [file]);
  return (
    <li className={styles.fileItem}>
      <div className={styles.fileExtension}>
        {fileData.fileExtension}
      </div>
      <div className={styles.fileName}>
        <p>{fileData.fileName}</p>
        <button
          type="button"
          onClick={() => { onRemove(file); }}
          className={styles.removeBtn}
        >
          <Icon
            name="remove-file"
            className={styles.removeSvg}
          />
        </button>
      </div>
    </li>
  );
};

FileItem.propTypes = {
  file: PropTypes.objectOf(shape({
    name: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FileItem;
