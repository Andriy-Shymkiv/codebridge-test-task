/* eslint-disable no-console */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Box, Button, CardActionArea, CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Article } from '../../types/Article';
import { convertDateToHumanDate } from '../../date/dateNormalize';

type Props = {
  article: Article;
};

export const CardItem: React.FC<Props> = ({ article }) => {
  const normalizedDate = convertDateToHumanDate(article.publishedAt);

  const cardStyles = {
    card: {
      height: '100%',
      position: 'relative',
      transition: 'all 0.5s',
      '&:hover': {
        transform: 'scale(1.03)',
      },
    },
    actionArea: {
      pointerEvents: 'none',
    },
    img: {
      marginBottom: '18px',
    },
    dataContent: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '5px',
      marginBottom: '16px',
    },
    title: {
      marginBottom: '16px',
    },
    summary: {
      marginBottom: '24px',
    },
    button: {
      display: 'flex',
      gap: '5px',
      color: '#363636',
      textTransform: 'none',
      position: 'absolute',
      bottom: '0',
      marginBottom: '16px',
    },
  };

  return (
    <Card sx={cardStyles.card}>
      <CardActionArea
        sx={cardStyles.actionArea}
      >
        <CardMedia
          sx={cardStyles.img}
          component="img"
          height="220"
          image={article.imageUrl}
          alt={article.title}
        />
        <CardContent>
          <Box sx={cardStyles.dataContent}>
            <CalendarMonthIcon />
            <p>{normalizedDate}</p>
          </Box>
          <Typography
            sx={cardStyles.title}
            gutterBottom
            variant="h5"
            component="div"
          >
            {article.title}
          </Typography>
          <Typography
            variant="body2"
            sx={cardStyles.summary}
          >
            {!article.summary && 'No description yet'}
            {article.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/${article.id}`}>
          <Button sx={cardStyles.button}>
            Read more
            <ArrowRightAltIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
