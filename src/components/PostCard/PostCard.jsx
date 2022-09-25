import * as React from 'react';
import styles from './style.module.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Tooltip, Button } from '@mui/material';

const PostCard = (props) => {
  return (
    <Card sx={{ maxWidth: 800 }} raised={true} className={styles.postCard}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[700] }} aria-label='user'>
            {props.userId}
          </Avatar>
        }
        title={'User ' + props.userId}
        titleTypographyProps={{ color: blue[700], fontSize: 20 }}
        subheader='September 14, 2016'
      />

      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={styles.cardActions}>
        <div>
          <Tooltip title='Excluir post'>
            <IconButton
              aria-label='delete post'
              onClick={props.handleDeletClick}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar post'>
            <IconButton
              aria-label='edit post'
              onClick={props.handleUpdateClick}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Button
            aria-label='Open comments'
            startIcon={<ChatBubbleIcon></ChatBubbleIcon>}
            onClick={props.openComments}
          >
            Comentários
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default PostCard;
