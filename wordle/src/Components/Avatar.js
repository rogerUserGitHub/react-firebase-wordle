import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export const ImageAvatars = ({ avatar }) => {
  const setSource = () => {
    return `${avatar}.webp`;
  };

  return <Avatar alt='R' src={setSource()} sx={{ width: 200, height: 200 }} />;
};

export default ImageAvatars;
