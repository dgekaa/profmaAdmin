import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import QUERY from "./query";
import Table from "./Table";

const Header = styled.div`
    position: fixed;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    top: 0;
    right: 0;
    left: 200px;
    height: 49px;
    padding-right: 20px;
    color: #999;
    background-color: #fff;
    width: calc(100% - 200px);
    box-shadow: 0 0.125rem 0.625rem rgb(90 97 105 / 12%);
  `,
  HeaderWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  `,
  LeftMenu = styled.div`
    background-color: #fff;
    position: fixed;
    width: 200px;
    height: 100vh;
    box-shadow: 0 0.125rem 9.375rem rgb(90 97 105 / 10%),
      0 0.25rem 0.5rem rgb(90 97 105 / 12%),
      0 0.9375rem 1.375rem rgb(90 97 105 / 10%),
      0 0.4375rem 2.1875rem rgb(165 182 201 / 10%);
  `,
  LeftMenuHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5a6169;
    font-weight: 500;
    height: 50px;
    border-bottom: 1px solid #e1e5eb;
    font-size: 25px;
  `,
  UnderLeftMenu = styled.div`
    width: 200px;
    height: 100vh;
  `,
  Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f5f6f8;
  `,
  TableWrap = styled.div`
    z-index: 0 !important;
    display: flex;
    flex: 1;
    margin-top: 75px;
  `,
  Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: #3d5170;
    font-weight: 400;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "#fbfbfb" : "#fff")};
    color: ${(props) => (props.active ? "#007bff" : "#3d5170")};
    box-shadow: ${(props) =>
      props.active ? "inset 0.1875rem 0 0 #007bff" : null};
    &:hover {
      transition: 0.2s ease all;
      box-shadow: inset 0.1875rem 0 0 #007bff;
      background-color: #fbfbfb;
      color: #007bff;
    }
  `;

const App = () => {
  const type = { Master: "Master", Client: "Client" };
  const [clickedBtn, setClickedBtn] = useState(""),
    [DATA, setDATA] = useState([]);

  const loadUsers = (usersType) => {
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
      })
      .catch((err) => {
        alert("error");
      });
  };

  useEffect(() => {
    setClickedBtn("clients");
    loadUsers(type.Client);
  }, []);

  return (
    <div className="App">
      <Wrapper>
        <LeftMenu>
          <LeftMenuHeader>Profma</LeftMenuHeader>

          <Button
            active={clickedBtn === "clients"}
            onClick={() => {
              setClickedBtn("clients");
              loadUsers(type.Client);
            }}
          >
            Клиенты
          </Button>
          <Button
            active={clickedBtn === "masters"}
            onClick={() => {
              setClickedBtn("masters");
              loadUsers(type.Master);
            }}
          >
            Мастера
          </Button>
        </LeftMenu>
        <UnderLeftMenu />
        <TableWrap>
          <HeaderWrap>
            <Header>Админка PROFMA</Header>
          </HeaderWrap>
          <Table length={DATA.length} DATA={DATA} />
        </TableWrap>
      </Wrapper>

      {/* <Table striped bordered hover>
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
            </Table> */}
      {/* </Container>
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
      )} */}
    </div>
  );
};

export default App;
