import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/home' element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
