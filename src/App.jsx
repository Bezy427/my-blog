import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import About from './pages/About';


function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>
    </div>
  )
}

export default App
