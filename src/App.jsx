import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/posts" element={<Posts />}/>
        <Route path="/posts/:id" element={<PostDetails />}/>
      </Routes>
    </div> 
  )
}

export default App
