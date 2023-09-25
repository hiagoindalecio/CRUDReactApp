import React, {useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, iconType } from '@sensenet/icons-react'
import { DropzoneProps } from '../../Interfaces';

import './styles.css';

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    props.onFileUploaded(file);
  }, [props]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl ?
        <img src={selectedFileUrl} alt="Point thumbnail" /> :
        isDragActive ?
        <p>Solte a imagem aqui...</p> :
        <p>
          <Icon
            type={iconType.materialui}
            iconName='file_upload' />
          Arraste e solte a imagem aqui ou clique para selecionar o arquivo
        </p>
      }
    </div>
  )
}

export default Dropzone;