import { Container, Row, Col } from "react-bootstrap";
import OrderList from "./OrderList";
import styled from "styled-components";
import { Outlet, useParams } from "react-router-dom";

const StyledCol = styled(Col)`
  padding: 0;
`;

const Order = ({ list, setList }) => {
  const { product } = useParams();
  console.log(product);

  return (
    <Container fluid>
      <Row>
        <StyledCol md={8}>
          {/*}
          <ProductMenu
            data={products}
            error={error}
            list={productList}
            setList={setProductList}
          />
          {*/}
          <Outlet />
        </StyledCol>
        <StyledCol md={4}>
          <OrderList list={list} setList={setList} />
        </StyledCol>
      </Row>
    </Container>
  );
};

export default Order;
