import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { Results } from '../Results';
import { SearchBar } from '../SearchBar';

export const HomePage: React.FC = () => {
  const [query, setQuery] = useLocalStorage('query', '');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove('article--body--content');
    }
  }, [location]);

  return (
    <Box>
      <p className="homepage--content">Filter by keywords</p>

      <SearchBar query={query} onQueryChange={setQuery} />
      <Results query={query} />
    </Box>
  );
};
