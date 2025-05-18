import React from 'react';
import PropTypes, { shape } from 'prop-types';
import styles from './FileList.module.scss';
import FileItem from './FileItem';

const FileList = ({ files, onRemove }) => (
  <>
    {files.length > 0
      && (
      <ul className={styles.fileList}>
        {files.map((file) => (
          <FileItem
            key={file?.name + Math.random()}
            file={file}
            onRemove={onRemove}
          />
        ))}
      </ul>
      )}
  </>
);

FileList.propTypes = {
  onRemove: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(shape(
    [
      PropTypes.objectOf(shape({
        name: PropTypes.string,
        type: PropTypes.string,
      })),
    ],
  )).isRequired,
};

export default FileList;
