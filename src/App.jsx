import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/posts" element={<Posts />}/>
          <Route 
            path="/posts/create"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/:id" element={<PostDetails />}/>
          <Route 
            path="/posts/:id" 
            element={
              <ProtectedRoute>
                <EditPost />      
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div> 
  )
}

export default App
