/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import htmlParser from 'html-react-parser';
import styles from './FileUploadController.module.scss';
import FileList from './FileList';
import Icon from '../Icon/Icon';

const FileUploadController = ({
  singleMode, disabled, className, onSelect, setMaxSize, mergedFiles, setMergedFiles,
}) => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [totalSize, setTotalSize] = useState(0);
  const inputRef = useRef(null);

  const fileConvertToSend = () => {
    Array.from(inputRef.current.files).forEach((f) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      // eslint-disable-next-line max-len
      const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      const fileNameStatic = f.name.split('.');
      let fileName = '';
      fileNameStatic.forEach((i, index) => {
        if (index !== fileNameStatic.length - 1) {
          fileName += i;
        }
      });

      reader.onload = () => {
        onSelect({
          [uuid]: {
            media: reader.result,
            name: fileName,
          },
        });
      };
    });
  };

  const addFileHandler = (e) => {
    setErrorMessage();
    const fileTarget = e.target.files[0];
    const fileSizeInBytes = fileTarget.size;
    const kilobytes = fileSizeInBytes / 1024;
    const megabytes = kilobytes / 1024;

    let fileSize = '';
    let newTotalSize = totalSize + megabytes;
    if (newTotalSize > 50) {
      setErrorMessage('Общий объём файлов не может превышать 50&nbsp;Мб');
      setMaxSize(true);
    } if (megabytes > 20) {
      setErrorMessage('Файл слишком большой, максимальный размер - 20&nbsp;Мб');
      e.target.value = null;
      newTotalSize -= megabytes;
      return;
    }

    if (megabytes > 1) {
      fileSize = `${megabytes.toFixed(2)} MB`;
    } else if (kilobytes > 1) {
      fileSize = `${kilobytes.toFixed(2)} KB`;
    } else {
      fileSize = `${fileSizeInBytes} bytes`;
    }

    console.log('Размер файла:', fileSize);
    fileConvertToSend();
    if (singleMode && files.length >= 1) {
      return;
    }

    const file = e.target.files[0];

    if (files.some((f) => f === file)) return;
    setTotalSize(newTotalSize);

    setFiles((prevState) => [...prevState, file]);
    inputRef.current.value = '';
  };

  const removeFileHandler = (file) => {
    const fileSizeInBytes = file.size;
    const kilobytes = fileSizeInBytes / 1024;
    const megabytes = kilobytes / 1024;
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    setTotalSize((prevTotalSize) => prevTotalSize - megabytes);
    inputRef.current.value = '';

    const mergedObj = mergedFiles;
    const deletedKey = file.name;
    let keyToDelete;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in mergedObj) {
      if (mergedObj[key].name === deletedKey) {
        keyToDelete = key;
        break;
      }
    }
    if (keyToDelete) {
      delete mergedObj[keyToDelete];
    }
    setMergedFiles(mergedObj);
  };

  useEffect(() => {
    if (totalSize <= 50) {
      setErrorMessage('');
      setMaxSize(false);
    }
  }, [totalSize]);

  return (
    <div className={classNames(
      styles.files,
      className,
      { [styles.disabled]: disabled },
    )}
    >
      <FileList onRemove={removeFileHandler} files={files} />
      {errorMessage && (
      <span className={styles.errorText}>
        {htmlParser(errorMessage)}
      </span>
      )}
      <div className={classNames(
        styles.inputWrapper,
        { [styles.singleMode]: singleMode && files.length >= 1 },
      )}
      >
        <input id="addFileInput" ref={inputRef} type="file" className={styles.input} onChange={addFileHandler} />
        <label htmlFor="addFileInput" className={styles.label}>
          <Icon name="clip" className={styles.clipSvg} />
          {files.length < 1 ? 'Прикрепить файл' : 'Прикрепить ещё'}
        </label>
      </div>
    </div>
  );
};

FileUploadController.propTypes = {
  singleMode: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  setMaxSize: PropTypes.func,
  mergedFiles: PropTypes.objectOf({}),
  setMergedFiles: PropTypes.func,
};
FileUploadController.defaultProps = {
  singleMode: false,
  disabled: false,
  className: '',
  onSelect: () => {},
  setMaxSize: () => {},
  mergedFiles: null,
  setMergedFiles: () => {},
};

export default FileUploadController;
