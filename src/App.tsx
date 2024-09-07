import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileList from './components/FileList';
import ImageUploader from './components/ImageUploader';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './components/Home';
import { AuthProvider } from './components/AuthProvider';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />  {/* Ruta para el Home */}
          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <FileList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <ImageUploader />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
