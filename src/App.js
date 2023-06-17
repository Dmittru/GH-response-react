import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import RepositoryPage from './pages/RepositoryPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/repository/:id" element={<RepositoryPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
