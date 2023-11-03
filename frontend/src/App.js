import {Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Accout from './pages/Accout'


function App() {
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={< Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {isUserSignedIn && <Route path="/accout" element={<Accout/>}/>}
      </Routes>
    </div>
  );
}

export default App;
