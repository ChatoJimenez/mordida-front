import { useState } from "react";
import { Button } from "react-bootstrap";

const CreateProduct = ({ setLogin }) => {
  const [name, setName] = useState("");
  const [precio, setPrecio] = useState();
  const [ingredientes, setIngredientes] = useState("");
  const [tipo, setTipo] = useState("food");

  const handleSumbit = (e) => {
    e.preventDefault();
    var ingredientList = [];
    if (ingredientes !== "") {
      ingredientList = ingredientes.split(", ");
      ingredientList.map((ingredient) => ingredient.toLowerCase());
    }
    //Crear objeto con los inputs
    const product = {
      type: tipo.toLowerCase(),
      name: name.toLowerCase(),
      price: parseInt(precio),
      extras: ingredientList,
    };
    //Enviar objeto al API
    fetch("https://mordida-spring-gcp.uc.r.appspot.com/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then(() => {
        console.log("Added product: ", product);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="create-container">
      <Button
        className="absolute-btn"
        onClick={() => {
          setLogin(false);
        }}
        variant={"danger"}
      >
        Cerrar Sesión
      </Button>
      <h2 className="bold grey-color">Crear Nuevo Producto</h2>
      {/*-- FORM: CREAR PRODUCTO --*/}
      <form className="form" onSubmit={handleSumbit}>
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
          <div className="d-flex flex-column align justify-content-start">
            {/*-- INPUT: PRECIO --*/}
            <label className="form-label mt-3 grey-color">Precio</label>
            <input
              className="form-control"
              required
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column align justify-content-start">
            {/*-- INPUT: TIPO --*/}
            <label className="form-label mt-3 grey-color">Tipo</label>
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
          <label className="form-label mt-3 grey-color">Ingredientes</label>
          <textarea
            className="form-control"
            rows="2"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center align-items-center w-100 mt-3">
          <Button type={"submit"}>Agregar</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
