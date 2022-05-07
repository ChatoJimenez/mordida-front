import { Container, Row, Col } from "react-bootstrap";
import { getImageByRoute } from "../functions/Images";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Container className="home-container">
      <h2 className="bold grey-color mb-0 text-center">Inicio</h2>
      <Row className="mt-4">
        <Col className="col-home" md={6} lg={6}>
          <div onClick={() => handleClick("admin")}>
            <img src={getImageByRoute("admin")} alt={"admin"} />
            <p>Administración</p>
          </div>
        </Col>
        <Col className="col-home" md={6} lg={6}>
          <div onClick={() => handleClick("products/menu")}>
            <img src={getImageByRoute("menu")} alt={"menu"} />
            <p>Menú</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
