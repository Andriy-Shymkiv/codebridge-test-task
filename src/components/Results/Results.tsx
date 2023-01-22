/* eslint-disable no-console */
import Grid from '@mui/material/Grid/Grid';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getArticles } from '../../api/fetchData';
import { Article } from '../../types/Article';
import { CardItem } from '../CardItem';
import { Loader } from '../Loader';

type Props = {
  query: string;
};

export const Results: React.FC<Props> = ({ query }) => {
  const [articles, setArticles] = useState<Article[] | null>([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = () => {
    try {
      const getArticlesFromServer = async () => {
        const articlesFromServer = await getArticles();

        setArticles(articlesFromServer.map(article => {
          const cuttedTitle = article.title
            .split(' ').slice(0, 6).join(' ');
          const cuttedSummary = article.summary
            .split(' ').slice(0, 10).join(' ');
          const limitedTitle = `${cuttedTitle}...`;
          const limitedSummary = `${cuttedSummary}...`;

          return {
            ...article,
            title: limitedTitle,
            summary: limitedSummary,
          };
        }));
      };

      getArticlesFromServer();

      setTimeout(() => {
        setLoading(false);
      }, 600);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const displayedArticles = articles?.filter(
    article => article.title.toLowerCase().includes(query.toLowerCase())
      || article.summary.toLowerCase().includes(query.toLowerCase()),
  ).sort((a, b) => {
    if (a.title.includes(query) && !b.title.includes(query)) {
      return -1;
    }

    if (!a.title.includes(query) && b.title.includes(query)) {
      return 1;
    }

    return 0;
  });

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
      {loading && (
        <Loader />
      )}
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
              {displayedArticles?.map(article => (
                <Grid item xs={2} sm={4} md={4}>
                  <CardItem article={article} key={article.id} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};
