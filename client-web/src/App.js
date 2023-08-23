import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './views/main/main';
import Login from './views/login/login';
import Auth from './views/auth/auth.js';
import Records from './views/records/records';
import SignUp from './views/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/auth" element={<Auth />} />
        <Route path="/medical-records" element={<Records />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;