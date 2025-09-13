import React, { useState, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Close, AddPhotoAlternate } from '@mui/icons-material';

interface ImageInputProps {
  onImageSelect: (file: File | null) => void;
  initialImage?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect, initialImage }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      onImageSelect(selectedFile);
    }
  };

  const handleButtonClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageSelect(null);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
        borderRadius: 3,
        bgcolor: '#f0f4f8',
        border: '2px dashed #b0c4de',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        mx: 'auto',
        mb: 2,
        '&:hover': {
          borderColor: '#5a7d9a',
          bgcolor: '#e6eef5',
        },
      }}
      onClick={!image ? handleButtonClick : undefined}
    >
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleImageChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      
      {image ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Preview do medicamento"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2.5,
            }}
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'white',
              color: '#666',
              width: 30,
              height: 30,
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
            size="small"
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            color: '#a0a0a0',
            textAlign: 'center',
          }}
        >
          <AddPhotoAlternate sx={{ fontSize: '4rem', mb: 1 }} />
          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
            Clique para adicionar uma foto
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageInput;