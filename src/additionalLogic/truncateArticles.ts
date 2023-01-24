import { Article } from '../types/Article';

export const truncateArticles = (articles: Article[]) => {
  return articles.map((article) => {
    const cuttedTitle = article.title.split(' ').slice(0, 6).join(' ');
    const cuttedSummary = article.summary.split(' ').slice(0, 10).join(' ');
    const limitedTitle = `${cuttedTitle}...`;
    const limitedSummary = `${cuttedSummary}...`;

    return {
      ...article,
      title: limitedTitle,
      summary: limitedSummary,
    };
  });
};
