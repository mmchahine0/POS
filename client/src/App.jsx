import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//pages 
import Login from './pages/Login';
import NotFound from './pages/notFound';
import Menu from "./pages/Menu";

//components


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<NotFound />}
          />
          <Route
              path="/Login"
              element={<Login />}
          />
          <Route
              path="/Menu"
              element={<Menu />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
