import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';

const pics = ['pic1', 'pic2', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  const setSource = picture => {
    return `${picture}.webp`;
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        {pics.map(pic => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(pic)} key={pic}>
              <ListItemAvatar>
                <Avatar
                  src={setSource(pic)}
                  sx={{ bgcolor: blue[100], color: blue[600], width: 70, height: 70 }}
                />
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const SimpleDialogDemo = ({ determineAvatar }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(pics[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
    determineAvatar(value);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen} sx={{ width: 200 }}>
        Choose avatar
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};

export default SimpleDialogDemo;
