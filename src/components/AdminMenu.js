import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { getImageByRoute } from "../functions/Images";

const Date = styled.div`
  background: #fff;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;

  h3 {
    font-size: 8em;
    margin-bottom: 0;
  }

  p {
    font-size: 2em;
    margin-bottom: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  ::after {
    content: "";
    width: 2px;
    background: #000;
    position: absolute;
  }
`;

const Element = styled.div`
  background: #f9f9f9;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
  color: #58585b;
  font-weight: 600;
  text-transform: uppercase;

  img {
    width: 40%;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 20px;
  }

  h3 {
    margin-bottom: 0;
    font-size: 4em;
  }

  h3::before {
    content: "$";
  }
`;

const day = moment().date();
const monthNum = moment().month();
const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const year = moment().year();

const AdminMenu = ({ setLogin }) => {
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(`/admin/${route}`);
  };
  return (
    <Container className="mt-4">
      <h2 className="bold grey-color mb-0">Administración</h2>
      <Button
        onClick={() => {
          setLogin(false);
        }}
        variant={"danger"}
        className="absolute-btn"
      >
        Cerrar Sesión
      </Button>

      <Grid>
        <Date className="bold grey-color">
          <h3>{day}</h3>
          <p>
            {months[monthNum]}/{year}
          </p>
        </Date>
        <Element onClick={() => navigateTo("total")}>
          <img src={getImageByRoute("total")} alt={"plus"} />
          <p>Venta total</p>
        </Element>
        <Element onClick={() => navigateTo("today")}>
          <img src={getImageByRoute("today")} alt={"day"} />
          <p>Venta del día</p>
        </Element>
        <Element
          onClick={() => {
            navigateTo("create");
          }}
        >
          <img src={getImageByRoute("create")} alt={"plus"} />
          <p>Agregar productos</p>
        </Element>
        <Element
          onClick={() => {
            navigateTo("edit");
          }}
        >
          <img src={getImageByRoute("edit")} alt={"edit"} />
          <p>Editar menú</p>
        </Element>
        <Element onClick={() => navigateTo("month")}>
          <img src={getImageByRoute("month")} alt={"month"} />
          <p>Venta del mes</p>
        </Element>
      </Grid>
    </Container>
  );
};

export default AdminMenu;
