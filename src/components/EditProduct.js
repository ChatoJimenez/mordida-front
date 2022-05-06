import { Modal, Button, Container } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BsChevronCompactLeft, BsArrowClockwise } from "react-icons/bs";
import { getImageByType } from "../functions/Images";

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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
`;

const ModalTitle = styled(Modal.Title)`
  text-transform: uppercase;
`;

const EditProduct = () => {
  //Modal

  const { product } = useParams();
  console.log(product);

  const { data: products, error } = useFetch(
    "http://localhost:8080/api/products"
  );

  //Estados para form
  const [name, setName] = useState("");
  const [precio, setPrecio] = useState();
  const [id, setId] = useState();
  const [tipo, setTipo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  //Estados para modal
  const [show, setShow] = useState(false);
  const [productToShow, setProductToShow] = useState({});

  const handleClose = (add, product) => {
    setShow(false);
  };
  const handleShow = (producto) => {
    setProductToShow(producto);
    setId(producto.id);
    setName(producto.name);
    setPrecio(producto.price);
    setTipo(producto.type);
    setIngredientes(producto.extras.join(", "));
    setShow(true);
  };

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/admin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var ingredientList = [];
    if (ingredientes !== "") {
      ingredientList = ingredientes.split(", ");
      ingredientList.map((ingredient) => ingredient.toLowerCase());
    }
    //Crear objeto con los inputs
    const product = {
      id: parseInt(id),
      type: tipo.toLowerCase(),
      name: name.toLowerCase(),
      price: parseInt(precio),
      extras: ingredientList,
    };
    //Enviar objeto al API
    fetch("http://localhost:8080/api/product/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then(() => {
        console.log("Modified product: ", product);
        handleClose();
      })
      .catch((err) => console.log(err.message));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h2 onClick={handleReturn} className="bold">
          <BsChevronCompactLeft className="mb-1" />
          Editar Productos
        </h2>
        <Button onClick={refreshPage} className="btn-refresh">
          <BsArrowClockwise className="icon-refresh" />
          Refresh
        </Button>
      </div>

      <GridContainer className="mt-4">
        <GridDiv>
          {products && products.length > 0 ? (
            products.map((producto) => (
              <>
                <Product key={producto.id}>
                  <img
                    onClick={() => handleShow(producto)}
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
                      Editar: {productToShow.name}
                    </ModalTitle>
                  </Modal.Header>
                  <Modal.Body>
                    {/* -- FORMULARIO PARA EDITAR PRODUCTO -- */}
                    {/* -- SETEAR DATOS -- */}

                    <form onSubmit={handleSubmit}>
                      <div className="d-flex flex-column w-100 mb-3">
                        {/*-- INPUT: ID --*/}
                        <label className="form-label grey-color">ID</label>
                        <input
                          className="form-control"
                          disabled
                          readOnly
                          type="text"
                          value={id}
                        ></input>
                      </div>
                      <div className="d-flex flex-column w-100">
                        {/*-- INPUT: NOMBRE --*/}
                        <label className="form-label grey-color">Nombre</label>
                        <input
                          className="form-control"
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></input>
                      </div>
                      <div className="d-flex flex-row gap-3">
                        <div className="d-flex flex-column align justify-content-start w-100">
                          {/*-- INPUT: PRECIO --*/}
                          <label className="form-label mt-3 grey-color">
                            Precio
                          </label>
                          <input
                            className="form-control"
                            required
                            type="text"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                          ></input>
                        </div>
                        <div className="d-flex flex-column align justify-content-start w-100">
                          {/*-- INPUT: TIPO --*/}
                          <label className="form-label mt-3 grey-color">
                            Tipo
                          </label>
                          <select
                            className="form-select"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                          >
                            <option value={"food"}>Desayuno</option>
                            <option value={"torta"}>Torta</option>
                            <option value={"complement"}>Complemento</option>
                            <option value={"beverage"}>Bebida</option>
                          </select>
                        </div>
                      </div>
                      <div className="d-flex flex-column w-100">
                        {/*-- INPUT: INGREDIENTES --*/}
                        <label className="form-label mt-3 grey-color">
                          Ingredientes
                        </label>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={ingredientes}
                          onChange={(e) => setIngredientes(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="d-flex justify-content-center align-items-center w-100 mt-3 mb-3 gap-3">
                        <Button
                          className="w-100"
                          variant="outline-danger"
                          disabled
                          onClick={() => {
                            handleClose(true, productToShow);
                          }}
                        >
                          Eliminar producto
                        </Button>
                        <Button
                          variant={"success"}
                          className="w-100"
                          type={"submit"}
                        >
                          Modificar producto
                        </Button>
                      </div>
                    </form>
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
                  </Modal.Footer>
                </Modal>
              </>
            ))
          ) : (
            <div>{error}</div>
          )}
        </GridDiv>
      </GridContainer>
    </Container>
  );
};

export default EditProduct;
