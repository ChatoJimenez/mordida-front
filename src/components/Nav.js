import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const navToAdmin = () => {
    navigate(`/admin`);
  };

  const navToMenu = () => {
    navigate(`/products/menu`);
  };

  return (
    <>
      <nav>
        <div className="container d-flex gap-3">
          <h4 className="mb-0 bold">La Mordida</h4>
          <div
            onClick={() => {
              navToAdmin();
            }}
            className="nav-btn"
          >
            Admin
          </div>
          <div
            onClick={() => {
              navToMenu();
            }}
            className="nav-btn"
          >
            Menu
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
