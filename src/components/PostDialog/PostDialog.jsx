import * as React from 'react';
import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

const PostDialog = (props) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setCurrentPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = useCallback(() => {
    if (props.post) {
      props.setCurrentPost(props.post);
    } else {
      props.setCurrentPost({});
    }
    props.onClose();
  }, [props]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby='post-dialog-title'
        aria-describedby='post-dialog-description'
      >
        <DialogTitle id='post-dialog-title'>{props.title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              mt: 1,
            }}
          >
            <TextField
              name='title'
              label='Título'
              id='title'
              fullWidth
              value={props.post && props.post.title}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              mt: 2,
            }}
          >
            <TextField
              rows={5}
              label='Texto'
              id='text'
              name='body'
              value={props.post && props.post.body}
              multiline
              fullWidth
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={props.onConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostDialog;
