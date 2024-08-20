import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import SearchResults from './components/SearchResults';
import TrainDataProvider from './components/TrainDataProvider';



function App() {
  return (
    <TrainDataProvider>
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/results" element={<SearchResults />} />
        </Routes>
      </Router>
    </TrainDataProvider>
  );
}

export default App;
