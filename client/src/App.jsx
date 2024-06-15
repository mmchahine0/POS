import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Login from "./pages/Login";
import NotFound from "./pages/notFound";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import UsersManage from "./pages/UsersManage";
import ProductsManage from "./pages/ProductsManage";
import CategoriesManage from "./pages/CategoriesManage";
import TaxManage from "./pages/TaxManage";
//components

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/usersManage" element={<UsersManage />} />
          <Route path="/productsManage" element={<ProductsManage />} />
          <Route path="/categoriesManage" element={<CategoriesManage />} />
          <Route path="/taxManage" element={<TaxManage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
