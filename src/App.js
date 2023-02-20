import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './navpages/about/About';
import Donate from './navpages/donate/Donate';
import Give from './navpages/give/Give';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/donate" exact element={<Donate />} />
        <Route path="/give" exact element={<Give />} />
      </Routes>
    </Router>
  );
}

export default App;
