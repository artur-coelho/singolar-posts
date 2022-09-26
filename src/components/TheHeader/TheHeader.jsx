import * as React from 'react';
import { useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PostService } from '../../services';
import PostDialog from '../PostDialog/PostDialog.jsx';

const settings = ['Perfil', 'Configurações', 'Logout'];

const TheHeader = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openNewPostModal, setOpenNewPostModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const onPost = useCallback(() => {
    const payload = { userId: 1, ...currentPost };
    createPost(payload);
  }, [currentPost]);

  const createPost = async (data) => {
    await PostService.createPost(data).then((resp) => {
      console.log(resp);
      setCurrentPost({});
    });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/home'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='/home'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'flex' },
                justifyContent: { xs: 'end', md: 'center' },
              }}
            >
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                  setOpenNewPostModal(true);
                }}
                sx={{
                  'my': 2,
                  'color': 'white',
                  'display': 'flex',
                  ':hover': { color: 'orange' },
                }}
              >
                NOVO POST
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <Tooltip title='Opções da conta'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='User Photo' src='' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <PostDialog
        title='Novo Post'
        open={openNewPostModal}
        onClose={() => setOpenNewPostModal(false)}
        onConfirm={onPost}
        setCurrentPost={setCurrentPost}
      />
    </div>
  );
};
export default TheHeader;
