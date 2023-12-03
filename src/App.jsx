import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <BrowserRouter basename="/theF2E2023-mission2/">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
