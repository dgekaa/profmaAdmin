import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import QUERY from "./query";
import { Container, Table, Button, Spinner, Modal } from "react-bootstrap";
import { push as Menu } from "react-burger-menu";

const Header = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  position: fixed !important;
  font-size: 25px;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "10px",
    top: "10px",
  },
  bmBurgerBars: {
    background: "#000",
  },
  bmBurgerBarsHover: {
    background: "#999",
  },
  bmCrossButton: {
    height: "36px",
    width: "36px",
    marginTop: "5px",
  },
  bmCross: {
    background: "#000",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    overflow: "hidden",
    background: "#fff",
    fontSize: "1.15em",
    borderRight: "1px solid #eee",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#000",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    position: "fixed",
    background: "rgba(0, 0, 0, 0.07)",
    overflow: "hidden",
  },
};

const App = () => {
  const type = { Master: "Master", Client: "Client" };
  const [clickedBtn, setClickedBtn] = useState(""),
    [DATA, setDATA] = useState(null),
    [isLoading, setIsLoading] = useState(false),
    [selectedUser, setSelectedUser] = useState(""),
    [modalShow, setModalShow] = useState(false);

  const loadUsers = (usersType) => {
    setIsLoading(true);
    QUERY({
      query: `query {users (type: ${usersType}, first:${100}) { 
        data { 
          id type
          profile {id city {id name} name email about_me}
          master_appointments {
            id date time status
            offers {
              description price_by_pack {duration price}
              service {id name specialization {id name} photos {src}}
            }
            client {
              profile {
                name email
              }
            }
          }
          client_appointments {
            id date time status
            offers {
              description price_by_pack {duration price}
              service {id name specialization {id name} photos {src}}
            }
            master {
              profile {
                name email
              }
            }
          }
        } 
      }}`,
    })
      .then((res) => res.json())
      .then((data) => {
        setDATA(data.data.users.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("error");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setClickedBtn("clients");
    loadUsers(type.Client);
  }, []);

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div>Appointments</div>
            UserId: {selectedUser.id} Name:{"  "}
            {selectedUser.profile ? selectedUser.profile.name : "-"} {"  "}
            Email:
            {selectedUser.profile ? selectedUser.profile.email : "-"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Master/client</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Offers</th>
              </tr>
            </thead>
            <tbody>
              {modalShow &&
                modalShow.length &&
                modalShow.map((el, index) => (
                  <tr>
                    <td>{el.id}</td>
                    <td>
                      {el.client
                        ? el.client.profile
                          ? el.client.profile.name
                          : "-"
                        : el.master.profile
                        ? el.master.profile.name
                        : "-"}
                    </td>
                    <td>{el.date}</td>
                    <td>{el.time.slice(0, 5)}</td>
                    <td>{el.status}</td>
                    <td>
                      {el.offers.length
                        ? el.offers.map((el, i) => (
                            <tr>
                              <td>{el.service.name}</td>
                              <td>{el.price_by_pack.duration} мин.</td>
                              <td>{el.price_by_pack.price} руб.</td>
                            </tr>
                          ))
                        : "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="App">
      <div id="outer-container">
        <Menu
          // onStateChange={(data) => window.scrollTo(0, 0)}
          disableAutoFocus
          styles={styles}
          burgerButtonClassName={"burger"}
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          width={"210px"}
        >
          <div
            style={{
              borderBottom: "1px solid #eee",
              padding: "11px",
              width: "210px",
            }}
          >
            Profma
          </div>
          <Button
            style={{ margin: "10px", width: "190px", marginTop: "21px" }}
            variant="outline-info"
            block
            onClick={() => {
              setClickedBtn("clients");
              loadUsers(type.Client);
            }}
            active={clickedBtn === "clients"}
          >
            КЛИЕНТЫ{" "}
            {DATA &&
              DATA.length &&
              DATA[0].type === "Client" &&
              `(${DATA.length})`}
          </Button>
          <Button
            style={{ margin: "10px", width: "190px" }}
            variant="outline-info"
            block
            onClick={() => {
              setClickedBtn("masters");
              loadUsers(type.Master);
            }}
            active={clickedBtn === "masters"}
          >
            МАСТЕРА{" "}
            {DATA &&
              DATA.length &&
              DATA[0].type === "Master" &&
              `(${DATA.length})`}
          </Button>
        </Menu>
        <div id="page-wrap" style={{ background: "rgba(0,0,0,0.02)" }}>
          <Header>
            {DATA && DATA.length && DATA[0].type === "Client"
              ? "Таблица клиентов"
              : "Таблица мастеров"}
          </Header>
          <Container>
            <div style={{ height: "70px" }}>Админка</div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>About me</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Appointments</th>
                </tr>
              </thead>
              <tbody>
                {DATA &&
                  DATA.length &&
                  DATA.map((el, index) => (
                    <tr key={index}>
                      <td>{el.id}</td>
                      <td>
                        {el.profile
                          ? el.profile.name
                            ? el.profile.name
                            : "-"
                          : "-"}
                      </td>
                      <td>
                        {el.profile
                          ? el.profile.about_me
                            ? el.profile.about_me
                            : "-"
                          : "-"}
                      </td>
                      <td>
                        {el.profile
                          ? el.profile.email
                            ? el.profile.email
                            : "-"
                          : "-"}
                      </td>
                      <td>
                        {el.profile
                          ? el.profile.city
                            ? el.profile.city.name
                            : "-"
                          : "-"}
                      </td>
                      <td>
                        {el.client_appointments.length !== 0 ||
                        el.master_appointments.length !== 0 ? (
                          <Button
                            variant="warning"
                            onClick={() => {
                              setModalShow(
                                el.client_appointments.length !== 0
                                  ? el.client_appointments
                                  : el.master_appointments
                              );
                              setSelectedUser(el);
                            }}
                          >
                            {el.client_appointments.length ||
                              el.master_appointments.length}
                          </Button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {isLoading && (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default App;
