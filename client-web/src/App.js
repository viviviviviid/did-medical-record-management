import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './main';
import Login from './login';
import Auth from './auth.js';
import Records from './records/records';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/auth" element={<Auth />} />
        <Route path="/medical-records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;