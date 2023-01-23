import { Container } from '@mui/system';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { ArticlePage } from './components/ArticlePage';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
      <Routes>
        <Route path="">
          <Route index element={<HomePage />} />
          <Route path=":articleId" element={<ArticlePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
};
