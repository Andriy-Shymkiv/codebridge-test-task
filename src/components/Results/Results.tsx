import Grid from '@mui/material/Grid/Grid';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { sortArticles } from '../../additionalLogic/sortArticles';
import { truncateArticles } from '../../additionalLogic/truncateArticles';
import { getArticles } from '../../api/fetchData';
import { Article } from '../../types/Article';
import { CardItem } from '../CardItem';
import { Loader } from '../Loader';

type Props = {
  query: string | null;
};

export const Results: React.FC<Props> = ({ query }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const displayedArticles = sortArticles(articles, query);

  const loadArticles = () => {
    try {
      const getArticlesFromServer = async () => {
        const articlesFromServer = await getArticles();
        const truncatedArticles = truncateArticles(articlesFromServer);

        setArticles(truncatedArticles);
      };

      getArticlesFromServer();

      setTimeout(() => {
        setLoading(false);
      }, 600);
    } catch {
      throw new Error('Cannot load data from server');
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const resultsContentStyles = {
    titleBox: {
      borderBottom: '1px solid #eaeaea',
      marginBottom: '45px',
    },
    cardBox: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '25px',
    },
  };

  return (
    <Box>
      {loading && <Loader />}
      {!loading && (
        <Box>
          <Box sx={resultsContentStyles.titleBox}>
            <p
              className="
                homepage--content
                homepage--content-results
              "
            >
              {`Results: ${displayedArticles?.length}`}
            </p>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 5, md: 5 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {displayedArticles?.map((article) => (
                <Grid item xs={4} sm={4} md={4} key={article.id}>
                  <CardItem article={article} query={query} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};
