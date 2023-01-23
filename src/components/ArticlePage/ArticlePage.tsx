import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Link, useLocation, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from 'react';
import { getArticleById } from '../../api/fetchData';
import { Article } from '../../types/Article';
import { Loader } from '../Loader';

export const ArticlePage: React.FC = () => {
  const [article, setArticle] = useState<Article | null>();
  const [loading, setLoading] = useState(true);

  const { articleId = '' } = useParams();
  const location = useLocation();

  const loadArticle = () => {
    try {
      const getArticle = async () => {
        const articleFromServer = await getArticleById(articleId);

        setArticle(articleFromServer);
      };

      getArticle();

      setTimeout(() => {
        setLoading(false);
      }, 600);
    } catch {
      throw new Error();
    }
  };

  useEffect(() => {
    if (location.pathname === `/${articleId}`) {
      document.body.classList.add('article--body--content');
    }
  }, [location]);

  useEffect(() => {
    loadArticle();
  });

  const articlePageStyles = {
    wrapper: {
      bgcolor: '#fff',
      height: '100%',
      border: '1px solid #EAEAEA',
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
      borderRadius: '5px',
      padding: '35px 75px 50px',
      marginBottom: '34px',
    },
    button: {
      display: 'flex',
      gap: '5px',
      color: '#363636',
      textTransform: 'none',
      marginLeft: '75px',
    },
  };

  return (
    <Container sx={{ marginTop: '150px' }}>
      {loading && <Loader />}
      {!loading && (
        <>
          <Box sx={articlePageStyles.wrapper}>
            <p className="articlepage--title">{article?.title}</p>
            <article
              className="
                articlepage--content
                articlepage--content-summary
              "
            >
              {article?.summary}
            </article>
          </Box>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button sx={articlePageStyles.button}>
              <KeyboardBackspaceIcon />
              Back to homepage
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
};
