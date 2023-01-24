import { Article } from '../types/Article';

export const sortArticles = (articles: Article[], query: string | null) => {
  if (query) {
    return articles?.filter(
      (article) => article.title.toLowerCase().includes(query.toLowerCase())
        || article.summary.toLowerCase().includes(query.toLowerCase()),
    )
      .sort((a, b) => {
        if (a.title.includes(query) && !b.title.includes(query)) {
          return -1;
        }

        if (!a.title.includes(query) && b.title.includes(query)) {
          return 1;
        }

        return 0;
      });
  }

  return articles;
};
