import { Container, Row, Col, Accordion, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import moment from "moment";
import { filterByMonth, filterByToday } from "../functions/Filters";
import { roundTwoDecimals } from "../functions/Round";

const DataCol = styled(Col)`
  padding-top: 1rem;
  background: #fff;

  border-radius: 0.33rem;
  h3 {
    font-size: 2.5em;
    margin-bottom: 0;
  }
`;
const OrderCol = styled(Col)`
  padding-top: 1rem;
  h4 {
    color: #fff;
  }
  border-radius: 0.33rem;
`;

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const TotalDetails = () => {
  const { data: orders, error } = useFetch(
    "https://mordida-spring-gcp.uc.r.appspot.com/api/orders"
  );

  return (
    <Container className="p-4">
      <h2 className="bold grey-color mb-0">Venta total</h2>
      <Row>
        <DataCol lg={4}>
          <div className="d-flex flex-column text-center">
            {orders && orders.length > 0 ? (
              <>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Total</h5>
                  <h3>
                    $
                    {orders.reduce(
                      (total, item) => roundTwoDecimals(item.totalSale + total),
                      0
                    )}
                  </h3>
                </div>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Número de órdenes</h5>
                  <h3>{orders.length}</h3>
                </div>
              </>
            ) : (
              <p>No hay datos</p>
            )}
          </div>
        </DataCol>
        <OrderCol lg={8}>
          <Accordion>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <Accordion.Item key={order.id} eventKey={index}>
                  {/* -- ENCABEZADO -- */}
                  <Accordion.Header className="grey-background">
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                      <p className="mb-0 ">Orden #{order.id}</p>
                      <p className="mb-0 bold mr-1">
                        ${roundTwoDecimals(order.totalSale)}
                      </p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center mb-3">
                      <p className="mb-0 bold">Productos vendidos:</p>
                      {/* -- FECHA -- */}
                      <p className="mb-0 grey-color">
                        {moment(order.timestamp).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    {/* -- LISTA DE PRODUCTOS -- */}
                    <ListGroup variant="flush">
                      {order.productList && order.productList.length > 0 ? (
                        order.productList.map((product) => (
                          <ListGroup.Item key={product.id}>
                            {/* -- PRODUCTO -- */}
                            <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                              <p className="mb-0 ">{product.name}</p>
                              <p className="mb-0 ">
                                ${roundTwoDecimals(product.price)}
                              </p>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <div>Está vacía</div>
                      )}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <div>{error}</div>
            )}
          </Accordion>
        </OrderCol>
      </Row>
    </Container>
  );
};

const TodayDetails = () => {
  const { data: orders, error } = useFetch(
    "https://mordida-spring-gcp.uc.r.appspot.com/api/orders"
  );

  const filteredOrders =
    orders && orders.filter((order) => filterByToday(order));

  return (
    <Container className="p-4">
      <h2 className="bold grey-color mb-0">Venta del día</h2>
      <Row>
        <DataCol lg={4}>
          <div className="d-flex flex-column text-center">
            {filteredOrders && filteredOrders.length > 0 ? (
              <>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Hoy es</h5>
                  <h3>
                    {moment(filteredOrders[0].timestamp).format("DD/MM/YYYY")}
                  </h3>
                </div>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Ventas totales</h5>
                  <h3>
                    $
                    {filteredOrders.reduce(
                      (total, item) => roundTwoDecimals(item.totalSale + total),
                      0
                    )}
                  </h3>
                </div>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Número de órdenes</h5>
                  <h3>{filteredOrders.length}</h3>
                </div>
              </>
            ) : (
              <p>No hay datos</p>
            )}
          </div>
        </DataCol>
        <OrderCol lg={8}>
          <Accordion>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <Accordion.Item key={order.id} eventKey={index}>
                  {/* -- ENCABEZADO -- */}
                  <Accordion.Header className="grey-background">
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                      <p className="mb-0 ">Orden #{order.id}</p>
                      <p className="mb-0 bold mr-1">
                        {" "}
                        ${roundTwoDecimals(order.totalSale)}
                      </p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center mb-3">
                      <p className="mb-0 bold">Productos vendidos:</p>
                      {/* -- FECHA -- */}
                      <p className="mb-0 grey-color">
                        {moment(order.timestamp).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    {/* -- LISTA DE PRODUCTOS -- */}
                    <ListGroup variant="flush">
                      {order.productList && order.productList.length > 0 ? (
                        order.productList.map((product) => (
                          <ListGroup.Item key={product.id}>
                            {/* -- PRODUCTO -- */}
                            <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                              <p className="mb-0 ">{product.name}</p>
                              <p className="mb-0 ">
                                ${roundTwoDecimals(product.price)}
                              </p>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <div>Está vacía</div>
                      )}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <div>{error}</div>
            )}
          </Accordion>
        </OrderCol>
      </Row>
    </Container>
  );
};

const MonthDetails = () => {
  const { data: orders, error } = useFetch(
    "https://mordida-spring-gcp.uc.r.appspot.com/api/orders"
  );

  /*const filterByToday = (order) => {
    return (
      moment(order.timestamp).format("DD/MM/YYYY") ===
      moment().format("DD/MM/YYYY")
    );
  };*/

  const filteredOrders =
    orders && orders.filter((order) => filterByMonth(order));

  return (
    <Container className="p-4">
      <h2 className="bold grey-color mb-0">Venta del mes</h2>
      <Row>
        <DataCol lg={4}>
          <div className="d-flex flex-column text-center">
            {filteredOrders && filteredOrders.length > 0 ? (
              <>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Estamos en</h5>
                  <h3>{months[moment(filteredOrders[0].timestamp).month()]}</h3>
                </div>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Total</h5>
                  <h3>
                    $
                    {filteredOrders.reduce(
                      (total, item) => roundTwoDecimals(item.totalSale + total),
                      0
                    )}
                  </h3>
                </div>
                <div className="d-flex flex-column  bordered-div mb-4 p-3">
                  <h5 className="mb-3 bold grey-color">Número de órdenes</h5>
                  <h3>{filteredOrders.length}</h3>
                </div>
              </>
            ) : (
              <p>No hay datos</p>
            )}
          </div>
        </DataCol>
        <OrderCol lg={8}>
          <Accordion>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <Accordion.Item key={order.id} eventKey={index}>
                  {/* -- ENCABEZADO -- */}
                  <Accordion.Header className="grey-background">
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                      <p className="mb-0 ">Orden #{order.id}</p>
                      <p className="mb-0 bold mr-1">
                        {" "}
                        ${roundTwoDecimals(order.totalSale)}
                      </p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center mb-3">
                      <p className="mb-0 bold">Productos vendidos:</p>
                      {/* -- FECHA -- */}
                      <p className="mb-0 grey-color">
                        {moment(order.timestamp).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    {/* -- LISTA DE PRODUCTOS -- */}
                    <ListGroup variant="flush">
                      {order.productList && order.productList.length > 0 ? (
                        order.productList.map((product) => (
                          <ListGroup.Item key={product.id}>
                            {/* -- PRODUCTO -- */}
                            <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                              <p className="mb-0 ">{product.name}</p>
                              <p className="mb-0 ">
                                ${roundTwoDecimals(product.price)}
                              </p>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <div>Está vacía</div>
                      )}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <div>{error}</div>
            )}
          </Accordion>
        </OrderCol>
      </Row>
    </Container>
  );
};

export { TotalDetails, TodayDetails, MonthDetails };
