import { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { TodayDetails, MonthDetails, TotalDetails } from "./AdminDetails";
import AdminMenu from "./AdminMenu";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import Login from "./Login";

const Admin = () => {
  const [login, setLogin] = useState(false);

  return (
    <Container fluid>
      <Routes>
        <Route
          path={""}
          element={
            login ? (
              <AdminMenu setLogin={setLogin} />
            ) : (
              <Login setLogin={setLogin} />
            )
          }
        />
        <Route
          path={"create"}
          element={<CreateProduct setLogin={setLogin} />}
        />
        <Route path={"total"} element={<TotalDetails />} />
        <Route path={"today"} element={<TodayDetails />} />
        <Route path={"month"} element={<MonthDetails />} />
        <Route path={"edit"} element={<EditProduct />} />
      </Routes>
    </Container>
  );
};

export default Admin;
