import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ListingPage from './pages/ListingPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/property/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
