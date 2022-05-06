import { Modal, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BsChevronCompactLeft } from "react-icons/bs";
import { getImageByType } from "../functions/Images";

const StyledDiv = styled.div`
  background-color: #fff;
  margin: 1rem;
  margin-top: 0;
  padding: 1rem;
`;

const GridContainer = styled.div``;

const Product = styled.div`
  background: #e0e0e0;

  aspect-ratio: 1;
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
    margin-bottom: 0.75rem;
  }
  h4 {
    text-transform: uppercase;
    margin-bottom: 0;
    text-align: center;
  }
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
`;

const ModalImg = styled.img`
  width: 200px;
`;

const ModalTitle = styled(Modal.Title)`
  text-transform: uppercase;
`;

const ProductMenu = ({ list, setList }) => {
  //Modal

  const { product } = useParams();
  console.log(product);

  const { data: products, error } = useFetch(
    "http://localhost:8080/api/products/" + product
  );

  const [show, setShow] = useState(false);
  const [productToShow, setProductToShow] = useState({});

  const handleClose = (add, product) => {
    if (add) {
      handleAdd(product);
      setShow(false);
    } else {
      setShow(false);
    }
  };
  const handleShow = (producto) => {
    setProductToShow(producto);
    setShow(true);
  };

  //Intento
  function handleAdd(object) {
    const newList = list.concat(object);

    setList(newList);
  }

  const getTitle = (product) => {
    switch (product) {
      case "food":
        return "Desayunos";
      case "complements":
        return "Complementos";
      case "beverages":
        return "Bebidas";
      case "tortas":
        return "Tortas";
      default:
        return "Productos";
    }
  };

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/products/menu");
  };

  return (
    <StyledDiv>
      <h2 onClick={handleReturn} className="bold">
        <BsChevronCompactLeft className="mb-1" />
        {getTitle(product)}
      </h2>

      <GridContainer className="mt-4">
        <GridDiv>
          {products && products.length > 0 ? (
            products.map((producto) => (
              <>
                <Product
                  onDoubleClick={() => handleShow(producto)}
                  key={producto.id}
                >
                  <img
                    onClick={() => handleAdd(producto)}
                    src={getImageByType(producto)}
                    alt="torta"
                  ></img>
                  <h4 className="bold grey-color s-20">{producto.name}</h4>
                </Product>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <ModalTitle className="bold grey-color">
                      {productToShow.name} - ${productToShow.price}
                    </ModalTitle>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center">
                      <ModalImg
                        src={getImageByType(productToShow)}
                        alt="torta"
                      ></ModalImg>
                    </div>
                    <h5 className="bold">Ingredientes:</h5>
                    <ListGroup variant="flush">
                      {productToShow.extras &&
                      productToShow.extras.length > 0 ? (
                        productToShow.extras.map((ingredient) => (
                          <ListGroup.Item>{ingredient}</ListGroup.Item>
                        ))
                      ) : (
                        <ListGroup.Item>No tiene ingredientes</ListGroup.Item>
                      )}
                    </ListGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleClose(false, null);
                      }}
                    >
                      Cerrar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClose(true, productToShow);
                      }}
                    >
                      Agregar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ))
          ) : (
            <div>{error}</div>
          )}
        </GridDiv>
      </GridContainer>
    </StyledDiv>
  );
};

export default ProductMenu;
