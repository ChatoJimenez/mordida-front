import "./App.css";
import Nav from "./components/Nav";
import Order from "./components/Order";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import ProductMenu from "./components/ProductMenu";
import { useState } from "react";

function App() {
  const [productList, setProductList] = useState([]);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path={"/admin/*"} element={<Admin />} />
          <Route
            path={"/products/*"}
            element={<Order list={productList} setList={setProductList} />}
          >
            <Route path={"menu"} element={<Menu />} />
            <Route
              path={":product"}
              element={
                <ProductMenu list={productList} setList={setProductList} />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
