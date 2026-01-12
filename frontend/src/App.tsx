import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerSearch from './components/CustomerSearch';
import CustomerProfile from './components/CustomerProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          <Route path="/" element={<CustomerSearch />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
