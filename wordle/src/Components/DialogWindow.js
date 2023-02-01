import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const DialogWindow = ({ isGuessed, numberOfTries }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handlePlayAgain = () => {
    setOpen(false);
    window.location.reload();
  };

  /*
   * side effects
   */
  useEffect(() => {
    if (isGuessed || numberOfTries === 6) {
      setOpen(true);
    }
  }, [isGuessed, numberOfTries]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby='responsive-dialog-title'
      >
        {isGuessed ? (
          <DialogTitle id='responsive-dialog-title'>
            Great job, it only took {numberOfTries} tries !
          </DialogTitle>
        ) : (
          <DialogTitle id='responsive-dialog-title'>Try again</DialogTitle>
        )}

        <DialogContent>
          <DialogContentText>
            Keep playing to get better at Wordle and increase your overall score !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePlayAgain}>
            Play again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogWindow;
