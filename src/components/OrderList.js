import { Button } from "react-bootstrap";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import { roundTwoDecimals } from "../functions/Round";
const StyledDiv = styled.div`
  background-color: #f9f9f9;
  margin-left: 1rem;
  padding: 1rem;
  margin-top: 0;
  height: calc(100vh - 1rem - 1.25rem - 0.3125rem - 0.3125rem - 1.1rem);
  margin-bottom: 0;
  margin-right: 0;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const List = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 15px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  Button {
    width: 100%;
  }
`;

const OrderList = ({ list, setList }) => {
  const clearList = () => {
    setList([]);
  };

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const handleRemove = (product) => {
    setList(removeItemOnce(list, product));

    console.log(list);
  };

  const handleCobrar = (list) => {
    list.map((product) => console.log(product.name, "-", product.price));

    /** Añadir la orden a la base de datos por medio de POST*/
    const order = {
      timestamp: null,
      totalSale: null,
      productList: list,
    };

    fetch("https://mordida-spring-gcp.uc.r.appspot.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then(() => {
        console.log("New order added");
        clearList();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <StyledDiv>
      <h2 className="bold">Cuenta</h2>
      <List>
        {list && list.length > 0 ? (
          list.map((product, index) => (
            <Product key={index}>
              <p className="mb-0">{product.name}</p>
              <div className="d-flex flex-row justify-content-center align-items.center">
                <p className="mb-0 mr-1">{product.price}</p>
                <div
                  className="btn-eliminar"
                  onClick={() => {
                    console.log("Eliminar item");
                    handleRemove(product);
                  }}
                >
                  <BsXLg />
                </div>
              </div>
            </Product>
          ))
        ) : (
          <div>La lista está vacía</div>
        )}
        {list.length > 0 ? (
          <>
            <p className="bold grey-text mt-4">
              Total:{" "}
              {list.reduce(
                (total, item) => roundTwoDecimals(item.price + total),
                0
              )}
            </p>
            <Buttons>
              <Button onClick={clearList} variant="danger">
                Cancelar
              </Button>
              <Button onClick={() => handleCobrar(list)}>Cobrar</Button>
            </Buttons>
          </>
        ) : (
          ""
        )}
      </List>
    </StyledDiv>
  );
};

export default OrderList;
