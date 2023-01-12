import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export const Badge = ({ badge }) => {
  const setSource = () => {
    return `${badge}.png`;
  };

  return <Avatar alt='R' src={setSource()} sx={{ width: 200, height: 200 }} />;
};

export default Badge;
