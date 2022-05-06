import styled from "styled-components";
import bebida from "../assets/bebida.png";
import complemento from "../assets/complemento.png";
import desayuno from "../assets/desayuno.png";
import torta from "../assets/torta.png";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  background-color: #fff;
  margin: 1rem;
  padding: 1rem;
  margin-top: 0;
  padding-bottom: 0.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
`;

const Product = styled.div`
  background: #e0e0e0;
  display: flex;
  aspect-ratio: 1;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
`;

const Menu = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(`/products/${route}`);
  };

  return (
    <StyledDiv>
      <h2 className="bold">Productos</h2>
      <Grid>
        <Product onClick={() => handleClick("food")}>
          <img src={desayuno} alt="desayuno"></img>
          <h4 className="bold mt-4 grey-color mb-0">DESAYUNO</h4>
        </Product>
        <Product onClick={() => handleClick("tortas")}>
          <img src={torta} alt="tortas"></img>
          <h4 className="bold mt-4 grey-color mb-0">TORTAS</h4>
        </Product>
        <Product onClick={() => handleClick("beverages")}>
          <img src={bebida} alt="bebida"></img>
          <h4 className="bold mt-4 grey-color mb-0">BEBIDAS</h4>
        </Product>
        <Product onClick={() => handleClick("complements")}>
          <img src={complemento} alt="complemento"></img>
          <h4 className="bold mt-4 grey-color mb-0">COMPLEMENTOS</h4>
        </Product>
      </Grid>
    </StyledDiv>
  );
};

export default Menu;
