import { Article } from '../types/Article';

const BASE_URL = 'https://api.spaceflightnewsapi.net';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url;

  return wait(300)
    .then(() => fetch(fullURL))
    .then((response) => {
      if (!response.ok) {
        throw new Error('Data can not be loaded from server');
      }

      return response.json();
    });
}

export const getArticles = () => get<Article[]>('/v3/articles');
export const getArticleById = (id: string) => get<Article>(`/v3/articles/${id}`);
